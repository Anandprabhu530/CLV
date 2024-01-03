import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type initialstatetype = {
  firstname: string;
  lastname: string;
  role: string;
  company_name: string;
};
const Builder = () => {
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    manager_name: "",
    role: "",
    company_name: "",
    experience: Number,
    previous_role: "",
    previous_company: "",
  });
  const [responsedata, setresponsedata] = useState();
  const [formerrors, setFormerrors] = useState<initialstatetype>({
    firstname: "",
    lastname: "",
    role: "",
    company_name: "",
  });
  const [issubmit, setIssubmit] = useState(false);

  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validate_data = (values: initialstatetype) => {
    const errors = {};
    if (values.firstname === "") errors.firstname = "Firstname is required";
    if (values.lastname === "") errors.lastname = "Lastname is required";
    if (values.role === "") errors.role = "Role is required";
    if (values.company_name === "")
      errors.company_name = "Company Name is required";
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && issubmit) {
      fetchthedata();
    }
  }, [formerrors]);

  const fetchthedata = async () => {
    const response = await fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt_data: formdata }),
    }).then((res) => res.json());
    console.log(response.kwargs.content);
    setresponsedata(response.kwargs.content);
    setIssubmit(false);
  };

  const handlealldata = async () => {
    setFormerrors(validate_data(formdata));
    setIssubmit(true);
  };

  return (
    <div className="lg:flex md:flex-none justify-center items-center lg:h-[90vh] font-poppins gap-16">
      <div className="basis-1/4">
        <div className=" text-white relative lg:card rounded-[1rem] bg-black p-10 lg:items-center flex flex-col gap-10 ">
          <div className="font-semibold text-2xl">Personel Information</div>
          <form action="submit" className="lg:flex lg:gap-20 md:flex">
            <div className="grid gap-6 text-xl w-full">
              <div>
                <input
                  onChange={handlechange}
                  placeholder="First name*"
                  type="text"
                  name="firstname"
                  value={formdata.firstname}
                  className={
                    formerrors.firstname
                      ? "border-red-400 bg-black border-b text-white placeholder:text-[#858585] outline-none py-2 w-full"
                      : "border-b-[#858585] border-b bg-black text-white placeholder:text-[#858585] outline-none py-2 w-full "
                  }
                />
                <p className="text-base text-red-400">{formerrors.firstname}</p>
              </div>
              <div>
                <input
                  onChange={handlechange}
                  placeholder="Last name*"
                  type="text"
                  value={formdata.lastname}
                  name="lastname"
                  className={
                    formerrors.lastname
                      ? "border-red-400 bg-black border-b text-white placeholder:text-[#858585] outline-none py-2 w-full"
                      : "border-b-[#858585] border-b bg-black text-white placeholder:text-[#858585] outline-none py-2 w-full "
                  }
                />
                <p className="text-base text-red-400">{formerrors.lastname}</p>
              </div>
              <div>
                <input
                  onChange={handlechange}
                  placeholder="Hiring Manager Name"
                  type="text"
                  name="manager_name"
                  className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full "
                />
              </div>
              <div>
                <input
                  onChange={handlechange}
                  placeholder="Role you are applying*"
                  type="text"
                  name="role"
                  value={formdata.role}
                  className={
                    formerrors.role
                      ? "border-red-400 bg-black border-b text-white placeholder:text-[#858585] outline-none py-2 w-full"
                      : "border-b-[#858585] border-b bg-black text-white placeholder:text-[#858585] outline-none py-2 w-full "
                  }
                />
                <p className="text-base text-red-400">{formerrors.role}</p>
              </div>
              <div>
                <input
                  onChange={handlechange}
                  placeholder="Company name*"
                  type="text"
                  value={formdata.company_name}
                  name="company_name"
                  className={
                    formerrors.company_name
                      ? "border-red-400 bg-black border-b text-white placeholder:text-[#858585] outline-none py-2 w-full"
                      : "border-b-[#858585] border-b bg-black text-white placeholder:text-[#858585] outline-none py-2 w-full "
                  }
                />
                <p className="text-red-400 text-base">
                  {formerrors.company_name}
                </p>
              </div>
              <div>
                <input
                  onChange={handlechange}
                  placeholder="Experience in years"
                  type="number"
                  name="experience"
                  className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full remove-arrow"
                />
              </div>
              <div>
                <input
                  onChange={handlechange}
                  placeholder="Previous Role Name"
                  type="text"
                  name="previous_role"
                  className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 lg:w-[350px]"
                />
              </div>
              <input
                onChange={handlechange}
                placeholder="Previous Company Name"
                type="text"
                name="previous_company"
                className="bg-black border-b border-[#858585] text-white placeholder:text-[#858585] outline-none py-2 w-full"
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
      <div className="basis-1/2 h-full p-8">
        <div className="h-full text-white text-base card relative bg-black rounded-xl">
          {issubmit ? (
            <div className="text-white text-2xl flex justify-center items-center h-full">
              Please Wait...
            </div>
          ) : (
            <ReactMarkdown className="p-8 lg:text-lg overflow-auto h-full">
              {responsedata}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
