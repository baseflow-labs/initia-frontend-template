export const setFontSize = (size: number) => ({
  type: "setFontSize" as const,
  size,
});

export const setMetadata = (data: {
  name: string;
  logo: string;
  logoFull: string;
  phoneNumber: string;
  slogan: string;
}) => {
  return {
    type: "setMetadata" as const,
    data,
  };
};
