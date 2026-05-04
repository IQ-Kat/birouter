const fs = require('fs');
const issues = JSON.parse(fs.readFileSync('/tmp/issues.json', 'utf8'));

const bugIssues = [];
const otherIssues = [];

for (const issue of issues) {
  const isBug = issue.labels.some(l => l.name === 'bug') || 
                /doesn't work|broken|crash|error/i.test(issue.body);
  const isFeature = issue.labels.some(l => l.name === 'enhancement' || l.name === 'feature') || /feature/i.test(issue.body);
  const isQuestion = issue.labels.some(l => l.name === 'question') || /how to/i.test(issue.body);

  if (isBug) {
    bugIssues.push(issue);
  } else {
    otherIssues.push({
      number: issue.number,
      title: issue.title,
      type: isFeature ? 'Feature' : (isQuestion ? 'Question' : 'Other')
    });
  }
}

console.log("=== BUG ISSUES ===");
for (const bug of bugIssues) {
  console.log(`\nIssue #${bug.number}: ${bug.title}`);
  console.log(`Author: ${bug.author.login} | Created: ${bug.createdAt}`);
  console.log(`Labels: ${bug.labels.map(l => l.name).join(', ')}`);
  console.log(`Comments: ${bug.comments.length}`);
  console.log(`Body Snippet: ${bug.body.substring(0, 200).replace(/\n/g, ' ')}...`);
  
  if (bug.comments.length > 0) {
    const lastComment = bug.comments[bug.comments.length - 1];
    console.log(`Last Comment by ${lastComment.author.login}: ${lastComment.body.substring(0, 150).replace(/\n/g, ' ')}`);
  }
}

console.log("\n=== OTHER ISSUES (SKIPPED) ===");
for (const other of otherIssues) {
  console.log(`#${other.number} - ${other.title} (${other.type})`);
}
