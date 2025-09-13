function Misc() {
  const studentDetails = [
    {
      name: "Miruthul kumar M",
      dept: "ECE",
      Regno: "133",
    },
  ];

const deptfullname = `${studentDetails[0].dept} [Electronics and Coummunication Engineering]`;

  return (
    //external css
    <div class="headers">
      <a href="https://github.com/Miruthulkumar">
        <h1 class="name">Miruthul</h1>
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_inline_layout">
        <h1 style={{ color: "orange", textDecoration: "underline" }}>
          This is an example for inline css
        </h1>
      </a>
      
      <h1>Name:{studentDetails[0].name}</h1>
      <h1>Department:{studentDetails[0].dept}</h1>
      <h1>Reg No:{studentDetails[0].Regno}</h1>
      <h1>Department Full Name : {deptfullname}</h1>
    </div>
  );
}

export default Misc;
