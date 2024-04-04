import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface ApplicantDocProps {
  applicantId: string,
  setIsOpen: any,
  setPdfUrl: any
}

const ApplicantDoc: React.FC<ApplicantDocProps>  = ({applicantId, setIsOpen, setPdfUrl}) => {

  const applicantFormId = '240802311742445';
  const [applicantIndex, setApplicantIndex] = useState<number | null>(null);

  const openModal = (answer: string, applicantIndex: number) => {
    setPdfUrl(applicantForm?.content[applicantIndex!].answers[`${answer}`].answer[0]);
    setIsOpen(true);
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

  useEffect(() => {
    setApplicantIndex(applicantForm?.content.findIndex((item: any) => item.answers["4"].answer === applicantId));
  }, [applicantId, applicantForm])

  return ( 
    <>
      <div className="font-bold">Applicant Id: </div>{applicantId}
      {/* {applicantForm && <>{applicantForm?.content[0].answers["4"].answer}</>} */}
      <div className="font-bold">Applicant Email</div>
      {applicantIndex != null && applicantForm?.content[applicantIndex]?.answers["3"].answer}
      <div className="border-b border-gray-300 my-4"></div>
      {applicantIndex !== null && applicantForm?.content[applicantIndex]?.answers["12"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal('12', applicantIndex)}
      >
        open PDF
      </button></>}
      {applicantIndex !== null && applicantForm?.content[applicantIndex]?.answers["69"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal('69', applicantIndex)}
      >
        open PDF
      </button></>}
      {applicantIndex !== null && applicantForm?.content[applicantIndex]?.answers["71"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal('71', applicantIndex)}
      >
        open PDF
      </button></>}
      {applicantIndex !== null && applicantForm?.content[applicantIndex]?.answers["76"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal('76', applicantIndex)}
      >
        open PDF
      </button></>}
      {applicantIndex !== null && applicantForm?.content[applicantIndex]?.answers["77"].answer.length > 0 && <><div>Uploaded pdf file</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal('77', applicantIndex)}
      >
        open PDF
      </button></>}
    </>
  );
}
 
export default ApplicantDoc;