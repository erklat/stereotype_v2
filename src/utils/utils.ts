export const trimString = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) {
    return text;
  }

  const words = text.split(" ");
  let trimmedString = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Check if adding the next word would exceed the maxLength
    if (
      (trimmedString + (trimmedString ? " " : "") + word).length > maxLength
    ) {
      break;
    }

    // Append the word to the trimmedString
    trimmedString += (trimmedString ? " " : "") + word;
  }

  // Remove trailing non-alphanumeric characters if needed
  const trimmedStringWithNoTrailingPunctuation = trimmedString.replace(
    /[^a-zA-Z0-9\s]*$/,
    ""
  );

  return trimmedStringWithNoTrailingPunctuation.length < text.length
    ? trimmedStringWithNoTrailingPunctuation + " ..."
    : trimmedStringWithNoTrailingPunctuation;
};
