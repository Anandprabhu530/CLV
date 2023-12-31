import { useState } from "react";

const Builder = () => {
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    manager_name: "",
    role: "",
    company_name: "",
    experience: null,
    previous_role: "",
    previous_company: "",
    description: "",
    achievements: "",
  });

  const handlechange = (e) => {
    setformdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlealldata = () => {
    if (
      formdata.firstname !== "" &&
      formdata.lastname !== "" &&
      formdata.role !== "" &&
      formdata.company_name !== ""
    )
      console.log(formdata);
  };
  return (
    <div className="lg:flex lg:flex-col justify-center items-center lg:h-[90vh] md:h-[90vh] font-poppins">
      <div className="text-white relative lg:card rounded-[1rem] md:card bg-black p-10 lg:items-center flex flex-col gap-10 border border-white">
        <div className="font-semibold text-2xl">Personel Information</div>
        <form action="submit" className="lg:flex lg:gap-20 md:flex">
          <div className="grid gap-6 text-xl w-full">
            <input
              onChange={handlechange}
              placeholder="First name*"
              type="text"
              name="firstname"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full"
            />
            <input
              onChange={handlechange}
              placeholder="Last name*"
              type="text"
              name="lastname"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full"
            />

            <input
              onChange={handlechange}
              placeholder="Hiring Manager Name"
              type="text"
              name="manager_name"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full"
            />
            <input
              onChange={handlechange}
              placeholder="Role you are applying*"
              type="text"
              name="role"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full"
            />
            <input
              onChange={handlechange}
              placeholder="Company name*"
              type="text"
              name="company_name"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full"
            />
            <input
              onChange={handlechange}
              placeholder="Experience in years"
              type="number"
              name="experience"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full remove-arrow"
            />
            <input
              onChange={handlechange}
              placeholder="Previous Role Name"
              type="text"
              name="previous_role"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 lg:w-[350px]"
            />
          </div>
          <div className="grid gap-6 text-xl w-full">
            <input
              onChange={handlechange}
              placeholder="Previous Company Name"
              type="text"
              name="previous_company"
              className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full"
            />
            <textarea
              onChange={handlechange}
              placeholder="Description"
              className="bg-black border rounded-md p-2 border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full h-[160px] resize-none lg:w-[350px] md:w-[350px]"
              name="description"
            />
            <textarea
              onChange={handlechange}
              placeholder="Enter your achievements"
              name="achievements"
              className="bg-black border rounded-md p-2 border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full  h-[140px] resize-none"
            />
          </div>
        </form>
        <div>
          <button
            type="submit"
            onClick={handlealldata}
            className="text-white mt-4 border border-[#858585] bg-black lg:px-4 py-2 rounded-md w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Builder;
