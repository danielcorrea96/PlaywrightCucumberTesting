const fs = require('fs');
const path = require('path');

const summaryPath = process.env.GITHUB_STEP_SUMMARY || process.env.SUMMARY_PATH;
const workdir = process.env.WORKDIR || process.cwd();

function writeSummary(text) {
  if (!summaryPath) {
    console.log('GITHUB_STEP_SUMMARY not available; printing summary:\n');
    console.log(text);
    return;
  }
  fs.appendFileSync(summaryPath, text);
}

function parseJUnitFile(filePath) {
  const xml = fs.readFileSync(filePath, 'utf8');
  // Try to extract tests, failures, skipped from testsuite or testsuites
  let tests = 0, failures = 0, skipped = 0;
  const tsMatch = xml.match(/<testsuite[^>]*tests="(\d+)"[^>]*>/);
  if (tsMatch) {
    tests = parseInt(tsMatch[1], 10);
    const fMatch = xml.match(/<testsuite[^>]*failures="(\d+)"[^>]*>/);
    const sMatch = xml.match(/<testsuite[^>]*skipped="(\d+)"[^>]*>/);
    failures = fMatch ? parseInt(fMatch[1], 10) : 0;
    skipped = sMatch ? parseInt(sMatch[1], 10) : 0;
  } else {
    const tsm = xml.match(/<testsuites[^>]*tests="(\d+)"[^>]*>/);
    if (tsm) {
      tests = parseInt(tsm[1], 10);
      const fMatch = xml.match(/<testsuites[^>]*failures="(\d+)"[^>]*>/);
      const sMatch = xml.match(/<testsuites[^>]*skipped="(\d+)"[^>]*>/);
      failures = fMatch ? parseInt(fMatch[1], 10) : 0;
      skipped = sMatch ? parseInt(sMatch[1], 10) : 0;
    }
  }
  // As a fallback, count occurrences of <testcase and <failure and <skipped
  if (tests === 0) {
    const tc = xml.match(/<testcase\b/g);
    tests = tc ? tc.length : 0;
  }
  if (failures === 0) {
    const f = xml.match(/<failure\b/g);
    failures = f ? f.length : 0;
  }
  if (skipped === 0) {
    const s = xml.match(/<skipped\b/g);
    skipped = s ? s.length : 0;
  }
  return { tests, failures, skipped };
}

function main() {
  try {
    const resultsDir = path.join(workdir, 'test-results');
    if (!fs.existsSync(resultsDir)) {
      writeSummary('### Test Summary\n');
      writeSummary('\nNo `test-results` directory was found in ' + workdir + '.\n');
      writeSummary('\nIf Playwright did not generate JUnit XML, the JUnit-based report will be skipped.\n');
      return;
    }
    const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('.xml'));
    if (!files.length) {
      writeSummary('### Test Summary\n');
      writeSummary('\nNo JUnit XML files were found in `test-results`.\n');
      writeSummary('Uploaded artifacts (playwright-report) can be inspected manually.\n');
      return;
    }

    let totalTests = 0, totalFailures = 0, totalSkipped = 0;
    for (const f of files) {
      const stats = parseJUnitFile(path.join(resultsDir, f));
      totalTests += stats.tests;
      totalFailures += stats.failures;
      totalSkipped += stats.skipped;
    }

    const passed = totalTests - totalFailures - totalSkipped;
    let summary = `### Test Summary\n\n`;
    summary += `- Total tests: **${totalTests}**\n`;
    summary += `- Passed: **${passed}**\n`;
    summary += `- Failed: **${totalFailures}**\n`;
    summary += `- Skipped: **${totalSkipped}**\n\n`;
    summary += `Detailed JUnit files: ${files.map(f => '`' + path.join('test-results', f) + '`').join(', ')}\n`;

    writeSummary(summary);
  } catch (err) {
    writeSummary('### Test Summary\n');
    writeSummary('\nFailed to generate test summary: ' + err.message + '\n');
    console.error(err);
  }
}

main();
