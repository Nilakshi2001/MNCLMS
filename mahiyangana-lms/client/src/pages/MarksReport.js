import React from 'react';

function MarksReport() {
  // TODO: Fetch marks from backend
  const mockData = [
    { subject: 'Math', marks: 85 },
    { subject: 'Science', marks: 90 }
  ];

  return (
    <div>
      <h2>Marks Report</h2>
      <table>
        <thead>
          <tr><th>Subject</th><th>Marks</th></tr>
        </thead>
        <tbody>
          {mockData.map((item, i) => (
            <tr key={i}>
              <td>{item.subject}</td>
              <td>{item.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarksReport;
