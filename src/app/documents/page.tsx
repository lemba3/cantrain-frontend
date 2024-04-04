"use client";
import { useEffect, useState } from "react";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PdfViewer from "../components/PdfViewer";
import SupervisorList from "../components/SupervisorList";
import ApplicantList from "../components/ApplicantList";
import ApplicantDoc from "../components/ApplicantDoc";

const DocumentsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [applicantId, setApplicantId] = useState<null | string>(null);
  const [supervisorSet, setSupervisorSet] = useState<any>();

  const openModal = (answer: number, json: any, selectedIndex: number) => {
    setPdfUrl(json.content[selectedIndex!].answers[`${answer}`].answer[0])
    // if(pdfUrl === "") {
    //   return;
    // }
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    // get all form submissions and check submissions for applicant id pdf is in 12 69 71 76 77
    <>
      {/* <ApplicantList setPdfUrl={setPdfUrl} openModal={openModal} setApplicantId={setApplicantId} /> */}
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto flex justify-center items-center bg-gray-800 bg-opacity-50">
          {/* Modal content */}
          <div className="bg-white p-8 rounded-lg max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">PDF File</h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <PdfViewer pdfUrl={pdfUrl} />
          </div>
        </div>
      )}
      {/* <div className="border-b border-gray-300 my-4"></div> */}

      {/* <div className="font-bold">Supervisor of the applicant</div> */}

      {/* {supervisorSet && <>{Array.from(supervisorSet).map((supervisor: any, index: number) => {
        let i = 0;
        return (
          supervisor.split(' £ ')[1] === applicantId &&
          <div key={index}>{supervisor.split(' £ ')[0]}</div>
        );
      })}</>} */}

      {/* <div className="border-b border-gray-300 my-4"></div> */}
      
      <SupervisorList setSupervisorSet={setSupervisorSet} openModal={openModal} setApplicantId={setApplicantId} />

      {/* {supervisorSet && <>{supervisorSet}</>} */}

      <div></div>

      {applicantId && <ApplicantDoc applicantId={applicantId} setIsOpen={setIsOpen} setPdfUrl={setPdfUrl} />}

    </>
  );
}
 
export default DocumentsPage;