import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface SupervisorListProps {
  setSupervisorSet: any,
  openModal: any,
  setApplicantId: any
}


const SupervisorList: React.FC<SupervisorListProps> = ({setSupervisorSet, openModal, setApplicantId}) => {

  // applicantid is 3, email is 33 pdf is in 8
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const supervisorFormId = 240802169487462;

  const { data: supervisorForm, isLoading, isError, error } = useQuery({
    queryKey: ['form/',supervisorFormId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_JOTFORM_API}/form/${supervisorFormId}/submissions?apiKey=${process.env.NEXT_PUBLIC_JOTFORM_API_KEY}`);
      if (!res.ok) {
        throw new Error('Could not fetch data');
      }
      return res.json();
    },
  });

  const onSelectSupervisor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value, 10);
    setSelectedIndex(index)
    // setApplicantId(1510959046);
    // set supervisorSet
    // also trigger applicant no change

  }

  const onApplicantSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setApplicantId(value);
  }

  const uniqueSupervisorApplicantSet: Set<any> = new Set(
    supervisorForm?.content.map((s: any) => {
      const email = s.answers["33"].answer; 
      const applicantId = s.answers["3"].answer;
      return `${email} £ ${applicantId}`;
    })
  );

  const uniqueSupervisors: Set<any> = new Set(
    supervisorForm?.content.map((s: any) => {
      const email = s.answers["33"].answer;
      return `${email}`;
    })
  );

  useEffect(() => {
    if(supervisorForm) {
      setSupervisorSet(uniqueSupervisorApplicantSet);
    }
  }, [supervisorForm])

  useEffect(() => {
    // trigger onChange of select tag of applicant
    if (selectedIndex !== null && supervisorForm) {
      // Get the applicantId from the selected supervisorForm content
      const applicantId = supervisorForm.content[selectedIndex].answers["3"].answer;
      // Set the applicantId using setApplicantId
      setApplicantId(applicantId);
    }
  }, [selectedIndex, supervisorForm])

  return (
    <>
      {/* <div>Display list of supervisors</div> */}
      <div className="font-bold">Choose supervisor</div>
      <select onChange={onSelectSupervisor} defaultValue="" className="border border-gray-300 rounded-md p-2 w-full max-w-md">
        <option disabled value="">Select a Supervisor</option>
        {/* {supervisorForm && supervisorForm.content.map((s: any, index: number) => (
          <option key={index} value={index}>{s.answers["33"].answer}</option>
        ))} */}
        {Array.from(uniqueSupervisors).map((supervisor: any, index: number) => (
          <option
           key={index} 
           value={index}
           className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2 cursor-pointer"
          >{supervisor}</option>
        ))}
      </select>

      <div className="border-b border-gray-300 my-4"></div>

      {selectedIndex !== null && supervisorForm.content[selectedIndex].answers["8"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal(8, supervisorForm, selectedIndex)}
      >
        Open PDF
      </button></>}

      {/* Applicant id {selectedIndex !== null && supervisorForm.content[selectedIndex].answers["3"].answer} */}
      <div className="font-bold">Applicants</div>
      <select onChange={onApplicantSelect} defaultValue="" className="border border-gray-300 rounded-md p-2 w-full max-w-md">
        <option disabled value="">Choose an Applicant</option>
        {selectedIndex !== null && 
          Array.from(uniqueSupervisorApplicantSet).map((s: any, index: number) => {
            return (
              s.split(" £ ")[0] === supervisorForm.content[selectedIndex].answers["33"].answer &&
              <option 
                key={index} 
                value={s.split(" £ ")[1]}
                className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2 cursor-pointer"
              >{s.split(" £ ")[1]}</option>
            );
        })}
      </select>
    </>
  );
}
 
export default SupervisorList;