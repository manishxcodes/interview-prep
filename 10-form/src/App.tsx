import { useState } from "react";
import "./App.css";

function App() {
  type FormData = {
    isResident: string;
    isRegistered: string;
    cbeStudentId: string;
    albertaEducationId: string;
    lastGradeCompleted: string;
    schoolWithdrawalDate: string;
    officialDocument: string;
    surname: string;
    firstname: string;
    lastname: string;
    akaSurname: string;
    akaFirstname: string;
    dob: string;
    gender: string;
    address: string;
    city: string;
    pincode: string;
    phoneNumber: string;
    quadrant: string;
    residentialDistrict: string;
    hasMedicalCondition: string;
    medicalConditionDescription: string;
    hasCompletedStudentHealthPlan: string;
    schoolName: string;
    gradeEntering: string;
    startDate: string;
    lastSchoolAttended: string;
    reasonForLeaving: string;
    gradeCompleted: string;
    wasSuspended: string;
    wasSuspensionResolved: string;
    isSuspensionResolvedDescription: string;
    lastSchoolAddress: string;
    lastSchoolCity: string;
    province: string;
  };

  const [formData, setFormData] = useState<FormData>({
    isResident: "",
    isRegistered: "",
    cbeStudentId: "",
    albertaEducationId: "",
    lastGradeCompleted: "",
    schoolWithdrawalDate: "",
    officialDocument: "",
    surname: "",
    firstname: "",
    lastname: "",
    akaSurname: "",
    akaFirstname: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    quadrant: "",
    residentialDistrict: "",
    hasMedicalCondition: "",
    medicalConditionDescription: "",
    hasCompletedStudentHealthPlan: "",
    schoolName: "",
    gradeEntering: "",
    startDate: "",
    lastSchoolAttended: "",
    reasonForLeaving: "",
    gradeCompleted: "",
    wasSuspended: "",
    wasSuspensionResolved: "",
    isSuspensionResolvedDescription: "",
    lastSchoolAddress: "",
    lastSchoolCity: "",
    province: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("registrationForm", JSON.stringify(formData));
    alert("Form Submitted");
    console.log("Saved:", formData);
  };

  return (
    <main className="min-w-screen h-screen  flex flex-col gap-4 items-center">
      <h1 className="text-center pt-4 text-2xl">Registration Form</h1>
      <form onSubmit={handleSubmit} className="max-w-5xl flex flex-col">
        {/* student information */}
        <div className="w-full ">
          <h3 className="text-md font-semibold mb-2 px-4 py-2">
            STUDENT INFORMATION
          </h3>
          {/* section 1 */}
          <div className="border border-neutral-300 flex flex-col">
            <div className="flex flex-col px-4 py-2">
              <h4 className="text-sm mb-1">DECLARATION OF RESIDENCY</h4>
              <div className="text-sm flex flex-col justify-center ">
                <div className="flex gap-x-8">
                  <span>
                    The student named below is a resident of the Calgary Board
                    of Education as defined by the School Ad.
                  </span>
                  <div className="flex items-center gap-2">
                    <label>
                      <input
                        type="radio"
                        name="isResident"
                        value={"Yes"}
                        onChange={handleChange}
                        checked={formData.isResident === "Yes"}
                        required
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isResident"
                        value={"No"}
                        onChange={handleChange}
                        checked={formData.isResident === "No"}
                        required
                      />{" "}
                      No
                    </label>
                  </div>
                </div>

                <span>
                  See the Student Residency and Important Information for
                  Parents on page 4 of this form.
                </span>
              </div>
            </div>
          </div>
          {/* section 2 */}
          <div className="flex gap-x-8 text-sm px-4 py-2 border border-neutral-300">
            <span>
              Has the student named below ever registered in Calgary Board of
              Education (CBE) school?
            </span>
            <div className="flex items-center gap-2">
              <label>
                <input
                  type="radio"
                  name="isRegistered"
                  value={"Yes"}
                  checked={formData.isRegistered === "Yes"}
                  onChange={handleChange}
                  required
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isRegistered"
                  value={"No"}
                  checked={formData.isRegistered === "No"}
                  onChange={handleChange}
                  required
                />{" "}
                No
              </label>
            </div>
          </div>
          {/* section 3 */}
          <div className="border border-neutral-300 px-4 py-2 grid grid-cols-4 text-sm">
            <div>
              <label className="font-semibold">
                CBE Student ID Number:
                <input
                  className="border border-neutral-400 px-2 py-1 rounded-md"
                  type="text"
                  name="cbeStudentId"
                  value={formData.cbeStudentId}
                  onChange={handleChange}
                  placeholder={"CBE Student ID Number"}
                />
              </label>
            </div>
            <div>
              <label className="font-semibold">
                Alberta Education ID Number:
                <input
                  className="border border-neutral-400 px-2 py-1 rounded-md"
                  type="text"
                  name="albertaEducationId"
                  value={formData.albertaEducationId}
                  onChange={handleChange}
                  placeholder={"Alberta Education ID"}
                />
              </label>
            </div>
            <div>
              <label className="font-semibold">
                Last Grade Completed:
                <input
                  className="border border-neutral-400 px-2 py-1 rounded-md"
                  type="text"
                  name="lastGradeCompleted"
                  value={formData.lastGradeCompleted}
                  onChange={handleChange}
                  placeholder="Last Grade Completed"
                />
              </label>
            </div>
            <div>
              <label className="font-semibold">
                School Withdrawal Date:
                <input
                  className="border border-neutral-400 px-2 py-1 rounded-md"
                  type="date"
                  name="schoolWithdrawalDate"
                  value={formData.schoolWithdrawalDate}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          {/* section 4 */}
          <div className="px-4 py-2 border border-neutral-300 flex flex-col gap-2">
            <p className="text-sm font-semibold">
              The student's Birth Certificate, Canadian Citizenship Certificate,
              Passport, Visa, Permanent Landed Immigrant or other official
              document must be given along with this form in order to register.
              A photocopy will be placed in the Official Student Record.
            </p>
            <label className="text-sm flex gap-2 text-nowrap">
              Name of the official document:
              <input
                className="border-b border-neutral-400 w-full"
                type="text"
                name="officialDocument"
                value={formData.officialDocument}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* section 5*/}
          <div className="grid grid-cols-4 border border-neutral-300 text-sm">
            <div className="flex flex-col px-4 py-2 gap-1">
              <h3 className="font-semibold">Student's Legal Name:</h3>
              <label className="text-sm flex gap-2 text-nowrap">
                Surname:
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </label>
              <label className="text-sm flex gap-2 text-nowrap">
                First Name:
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </label>
              <label className="text-sm flex gap-2 text-nowrap">
                Last Name:
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="flex flex-col px-4 py-2 gap-1 col-span-2">
              <h3 className="font-semibold">
                Student's AKA Name (name by which the student is commonly known
                in the family and community)
              </h3>
              <label className="text-sm flex gap-2 text-nowrap">
                AKA Surname:
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="akaSurname"
                  value={formData.akaSurname}
                  onChange={handleChange}
                />
              </label>
              <label className="text-sm flex gap-2 text-nowrap">
                AKA First Name:
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="akaFirstname"
                  value={formData.akaFirstname}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="px-4 py-2">
              <label className="text-sm flex gap-2 text-nowrap">
                Birthdate:
                <input
                  className="border border-neutral-400 w-full rounded-sm px-2 py-1"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          {/* section 6 */}
          <div className="text-sm border flex items-center gap-8 border-neutral-300 px-4 py-2">
            <span>Gender:</span>
            <label className="text-sm flex gap-2 text-nowrap">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              {""}
              Male
            </label>
            <label className="text-sm flex gap-2 text-nowrap">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              {""}
              Female
            </label>
            <label className="text-sm flex gap-2 text-nowrap">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
              {""}
              Other
            </label>
          </div>
          {/* section 7 */}
          <div className="border border-neutral-300 grid grid-cols-4 px-4 py-2 text-sm  gap-2">
            <label className="flex w-full gap-2 col-span-2">
              Address:
              <input
                className="border border-neutral-300 px-2 py-1 rounded-md w-full"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <label className="flex w-full gap-2">
              City:
              <input
                className="border border-neutral-300 px-2 py-1 rounded-md w-full"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
            <label className="flex w-full gap-2">
              Pincode:
              <input
                className="border border-neutral-300 px-2 py-1 rounded-md w-full"
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* section 8 */}
          <div className="text-sm border items-center border-neutral-300 px-4 py-2 grid grid-cols-3 gap-4">
            <label className="text-sm flex gap-2 text-nowrap">
              Phone Number:{" "}
              <input
                className="border-b border-neutral-400 w-full"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </label>

            <div className="text-sm flex flex-col gap-2 text-nowrap">
              <span>Quadrant of the city (please select one)</span>
              <div className="flex gap-4">
                {["NW", "NE", "SW", "SE"].map((q) => (
                  <label key={q}>
                    <input
                      type="radio"
                      name="quadrant"
                      value={q}
                      checked={formData.quadrant === q}
                      onChange={handleChange}
                    />{" "}
                    {q}
                  </label>
                ))}
              </div>
            </div>

            <label className="text-sm flex gap-2 text-nowrap">
              Residential District:{" "}
              <input
                className="border-b border-neutral-400 w-full"
                type="text"
                name="residentialDistrict"
                value={formData.residentialDistrict}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-md font-semibold mt-2  mb-1 px-4 py-">
            MEDICAL INFORMATION
          </h3>
          <div className="border border-neutral-300 text-sm flex flex-col px-4 py-2 gap-2">
            <p>
              If the student's attendance at scholl may be affected by an
              existing medical or physical condition. It is your responsibility
              to complete and submit the Student Health Plan that is available
              from the school or online.
            </p>
            <div className="flex items-center gap-2">
              <span>
                Does your child has any medical condition that may affect
                his/her attendance at scholl?
              </span>
              <label className="text-sm flex gap-2 text-nowrap">
                <input
                  className="border-b border-neutral-400 w-full"
                  type="radio"
                  name="hasMedicalCondition"
                  value={"Yes"}
                  onChange={handleChange}
                  checked={formData.hasMedicalCondition === "Yes"}
                />{" "}
                Yes
              </label>
              <label className="text-sm flex gap-2 text-nowrap">
                <input
                  className="border-b border-neutral-400 w-full"
                  type="radio"
                  name="hasMedicalCondition"
                  value={"No"}
                  checked={formData.hasMedicalCondition === "No"}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>
            <label className="text-sm flex gap-2 text-nowrap">
              If yes, please give a brief description
              <input
                className="border-b border-neutral-400 w-full"
                type="text"
                name="medicalConditionDescription"
                value={formData.medicalConditionDescription}
                onChange={handleChange}
              />{" "}
            </label>
            <div className="flex items-center gap-2">
              <span>Have you completed the student health plan</span>
              <label className="text-sm flex gap-2 text-nowrap">
                <input
                  className="border-b border-neutral-400 w-full"
                  type="radio"
                  name="hasCompletedStudentHealthPlan"
                  value={"Yes"}
                  checked={formData.hasCompletedStudentHealthPlan == "Yes"}
                  onChange={handleChange}
                />{" "}
                Yes
              </label>
              <label className="text-sm flex gap-2 text-nowrap">
                <input
                  className="border-b border-neutral-400 w-full"
                  type="radio"
                  name="hasCompletedStudentHealthPlan"
                  value={"No"}
                  checked={formData.hasCompletedStudentHealthPlan === "No"}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-md font-semibold mt-2  mb-1 px-4 py-2">
            SCHOOL INFORMATION
          </h3>
          <div className="border  border-neutral-300 text-sm">
            <div className="grid grid-cols-4 px-4 py-2 gap-4 items-center border border-neutral-300">
              <div className="col-span-2 ">
                <label>
                  Name of scholl at which student is registering
                  <input
                    className="border-b border-neutral-400 w-full"
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <label>
                Grade Entering
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="gradeEntering"
                  value={formData.gradeEntering}
                  onChange={handleChange}
                />
              </label>
              <label>
                Start Date
                <input
                  className="border border-neutral-400 w-full px-2 py-1 rounded-md"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </label>
            </div>
            {/*  */}
            <div className="grid grid-cols-3 px-4 py-2 gap-4 items-center border border-neutral-300">
              <label>
                Name of last School Attended
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="lastSchoolAttended"
                  value={formData.lastSchoolAttended}
                  onChange={handleChange}
                />
              </label>
              <label>
                Reason for leaving last school
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="reasonForLeaving"
                  value={formData.reasonForLeaving}
                  onChange={handleChange}
                />
              </label>
              <label>
                Grade Completed
                <input
                  className="border-b border-neutral-400 w-full"
                  type="text"
                  name="gradeCompleted"
                  value={formData.gradeCompleted}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="border border-neutral-300 text-sm grid grid-cols-4">
            <div className="col-span-2 flex flex-col px-4 py-2 gap-y-2">
              <div className="flex gap-2">
                <span className="font-semibold">
                  Was the student suspended or expelled from the last
                  school?{" "}
                </span>
                <label>
                  <input
                    type="radio"
                    name="wasSuspended"
                    value="Yes"
                    checked={formData.wasSuspended === "Yes"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="wasSuspended"
                    value="No"
                    checked={formData.wasSuspended === "No"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">
                  {" "}
                  If yes, Was the suspension resolved?{" "}
                </span>
                <label>
                  <input
                    type="radio"
                    name="wasSuspensionResolved"
                    value="Yes"
                    checked={formData.wasSuspensionResolved === "Yes"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="wasSuspensionResolved"
                    value="No"
                    checked={formData.wasSuspensionResolved === "No"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
              <div>
                <p>
                  (If the suspendsion has not been resolved CBE staff will refer
                  to Student Services suspension)
                </p>
              </div>
            </div>
            <div className="col-span-2 px-4 py-2 border-l border-neutral-300">
              <label>
                Is suspension resolved please provide further information
                <textarea
                  className="border-b border-neutral-300 w-full"
                  name="isSuspensionResolvedDescription"
                  value={formData.isSuspensionResolvedDescription}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      isSuspensionResolvedDescription: e.target.value,
                    }));
                  }}
                />
              </label>
            </div>
          </div>
          <div className="border border-neutral-300 text-sm grid grid-cols-4 px-4 py-2 gap-2">
            <div className="col-span-2 flex gap-2 border-r border-neutral-300 px-1">
              <label>
                Address of last school (if outside CBE)
                <input
                  className="border-b w-full border-neutral-300"
                  type="text"
                  name="lastSchoolAddress"
                  value={formData.lastSchoolAddress}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="border-r px-1 border-neutral-300">
              <label>
                City
                <input
                  className="border-b w-full border-neutral-300"
                  type="text"
                  name="lastSchoolCity"
                  value={formData.lastSchoolCity}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Province
                <input
                  className="border-b w-full border-neutral-300"
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-neutral-900 text-white px-4 py-2 rounded self-center"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
