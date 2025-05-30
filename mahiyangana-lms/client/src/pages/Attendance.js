import React, { useState } from 'react';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  const markAttendance = (studentId, status) => {
    setAttendanceData([...attendanceData, { studentId, status }]);
    // TODO: Send to backend
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      {/* Example hardcoded student list */}
      <div>
        <p>Student A <button onClick={() => markAttendance('studentA', 'Present')}>Present</button></p>
        <p>Student B <button onClick={() => markAttendance('studentB', 'Absent')}>Absent</button></p>
      </div>
    </div>
  );
}

export default Attendance;