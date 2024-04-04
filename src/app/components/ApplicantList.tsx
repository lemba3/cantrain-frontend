import { useState } from "react";
import { useQuery } from "react-query";

interface ApplicantListProps {
  setPdfUrl: any;
  openModal: (answer: any, json: any, selectedIndex: number) => void,
  setApplicantId: (id: number) => void
}

const ApplicantList: React.FC<ApplicantListProps> = ({setPdfUrl, openModal, setApplicantId}) => {

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const applicantFormId = 240802311742445;

  const onSelectApplicant = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value, 10);
    setApplicantId(applicantForm.content[index!].answers["4"].answer);
    setSelectedIndex(index)
    // setApplicantId(1510959046);
  }

  const { data: applicantForm, isLoading, isError, error } = useQuery({
    queryKey: ['form/',applicantFormId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_JOTFORM_API}/form/${applicantFormId}/submissions?apiKey=${process.env.NEXT_PUBLIC_JOTFORM_API_KEY}`);
      if (!res.ok) {
        throw new Error('Could not fetch data');
      }
      return res.json();
    },
  });

  return (
    //applicant id pdf is in 12 69 71 76 77
    <>
      Choose an Applicant
      <select onChange={onSelectApplicant} defaultValue="">
      <option disabled value="">Select an Applicant</option>
        {applicantForm && applicantForm.content.map((c: any, index: number) => (
          <option key={index} value={index}>{c.answers["3"].answer}({c.answers["4"].answer})</option>
        ))}
      </select>
      <div className="border-b border-gray-300 my-4"></div>
      <div>Applicant Id: {selectedIndex !== null && applicantForm.content[selectedIndex].answers["4"].answer}</div>
      
      <div className="border-b border-gray-300 my-4"></div>

      {selectedIndex !== null && applicantForm.content[selectedIndex].answers["12"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal(12, applicantForm, selectedIndex)}
      >
        Open PDF Modal
      </button></>}
      {selectedIndex !== null && applicantForm.content[selectedIndex].answers["69"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal(69, applicantForm, selectedIndex)}
      >
        Open PDF Modal
      </button></>}
      {selectedIndex !== null && applicantForm.content[selectedIndex].answers["71"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal(71, applicantForm, selectedIndex)}
      >
        Open PDF Modal
      </button></>}
      {selectedIndex !== null && applicantForm.content[selectedIndex].answers["76"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal(76, applicantForm, selectedIndex)}
      >
        Open PDF Modal
      </button></>}
      {selectedIndex !== null && applicantForm.content[selectedIndex].answers["77"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal(77, applicantForm, selectedIndex)}
      >
        Open PDF Modal
      </button></>}
    </>
  );
}
 
export default ApplicantList;