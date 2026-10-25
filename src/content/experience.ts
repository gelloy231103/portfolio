export type Role = {
  title: string;
  organization: string;
  /** Free text so unknown dates are never invented, e.g. "Present". */
  period: string;
  current?: boolean;
};

export const experience: Role[] = [
  {
    title: "Computer Programmer III",
    organization: "Commission on Elections",
    period: "Present",
    current: true,
  },
];
