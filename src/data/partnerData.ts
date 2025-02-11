export interface PartnerData {
    name: string;
    logoUrl: string;
    Header: string;
    subHeader: string;
    description: string;
    largeMedia: string;
    caseStudyNumber: number;
    caseStudyTabNames: string[];
    caseStudyMedia: string,
    caseStudySubHeading1?: string;
    caseStudyProblem1?: string;
    caseStudySolution1?: string;
    caseStudyCollaboration1?: string;
    caseStudySubHeading2?: string;
    caseStudyProblem2?: string;
    caseStudySolution2?: string;
    caseStudyCollaboration2?: string;
    caseStudySubHeading3?: string;
    caseStudyProblem3?: string;
    caseStudySolution3?: string;
    caseStudyCollaboration3?: string;

  }
  
  export const partnersData: { [key: string]: PartnerData } = {
    "boeing": {
      name: "Boeing",
      logoUrl: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png",
      Header: "Page Header",
      subHeader: "Page Sub Header",
      description: "The red glow of tail lights indicating another long drive home from work after an even longer 24-hour shift at the hospital. The shift hadnt been horrible but the constant stream of patients entering the ER meant there was no downtime. She had some of the “regulars” in tonight with new ailments they were sure were going to kill them. It’s amazing what a couple of Tylenol and a physical exam from the doctor did to eliminate their pain, nausea, headache, or whatever other mild symptoms they had. Sometimes she wondered if all they really needed was some interaction with others and a bit of the individual attention they received from the nurses. ",
      largeMedia: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png",
      caseStudyNumber: 3,
      caseStudyTabNames: ["tab 1", "tab 2", "tab 3"],
      caseStudyMedia: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png",

      caseStudySubHeading1: "How We Helped Partner A 111111111",
      caseStudyProblem1: "Partner A faced a challenge with scaling 1111111.",
      caseStudySolution1: "We provided an innovative solution to optimize their operations 11111111.",
      caseStudyCollaboration1: "Our team worked closely with Partner A to ensure seamless integration 111111111.",

      caseStudySubHeading2: "How We Helped Partner A 2222222",
      caseStudyProblem2: "Partner A faced a challenge with scaling 2222222.",
      caseStudySolution2: "We provided an innovative solution to optimize their operations 2222222.",
      caseStudyCollaboration2: "Our team worked closely with Partner A to ensure seamless integration 222222.",

      caseStudySubHeading3: "How We Helped Partner A 33333333",
      caseStudyProblem3: "Partner A faced a challenge with scaling 333333.",
      caseStudySolution3: "We provided an innovative solution to optimize their operations 333333.",
      caseStudyCollaboration3: "Our team worked closely with Partner A to ensure seamless integration 333333.",
    },
  
  };