const MaskEmail = ({ email }) => {
  const [localPart, domain] = email.split("@");

  const visible = localPart.slice(0, 7);
  const maskedLength = Math.max(0, localPart.length - visible.length);
  const masked = "*".repeat(maskedLength);

  return `${visible}${masked}@${domain}`;
};

export default MaskEmail;
