import { XMLParser } from 'fast-xml-parser'

const FLEX_BASE = 'https://gdcdyn.interactivebrokers.com/Universal/servlet/FlexStatementService'

/**
 * Fetch an IB Flex Query report (2-step process: request → poll → get)
 * @param {string} token - Flex Web Service token
 * @param {string} queryId - Flex Query ID
 * @returns {Object} parsed XML report as JS object
 */
export async function fetchFlexReport(token, queryId) {
  // Step 1: Request the report
  const requestUrl = `${FLEX_BASE}.SendRequest?t=${token}&q=${queryId}&v=3`
  const reqRes = await fetch(requestUrl)
  const reqText = await reqRes.text()

  const parser = new XMLParser({ ignoreAttributes: false })
  const reqParsed = parser.parse(reqText)

  const referenceCode = reqParsed?.FlexStatementResponse?.ReferenceCode
  const status = reqParsed?.FlexStatementResponse?.Status

  if (!referenceCode || status === 'Fail') {
    const errMsg = reqParsed?.FlexStatementResponse?.ErrorMessage || 'Unknown error'
    throw new Error(`Flex request failed: ${errMsg}`)
  }

  // Step 2: Poll for the report (IB needs a few seconds to generate)
  const getUrl = `${FLEX_BASE}.GetStatement?q=${referenceCode}&t=${token}&v=3`
  let report = null
  const maxAttempts = 5

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise(r => setTimeout(r, attempt === 0 ? 3000 : 5000))

    const getRes = await fetch(getUrl)
    const getText = await getRes.text()

    // Check if it's still processing (IB returns XML with status)
    if (getText.includes('<FlexStatementResponse>') && getText.includes('Statement generation in progress')) {
      continue
    }

    report = parser.parse(getText)

    if (report?.FlexQueryResponse || report?.FlexStatements) {
      return report
    }
  }

  throw new Error('Flex report timed out after polling')
}
