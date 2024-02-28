function encrypt() {
    const shift = parseInt(document.getElementById("shift").value);
    const message = document.getElementById("message").value;
    const output = document.getElementById("output");
  
    if (shift < 1 || shift > 25) {
      output.textContent = "Shift value must be between 1 and 25.";
      return;
    }
  
    const encryptedMessage = encryptMessage(message, shift);
    output.textContent = "Encrypted message: " + encryptedMessage;
  }
  
  function decrypt() {
    const shift = parseInt(document.getElementById("shift").value);
    const message = document.getElementById("message").value;
    const output = document.getElementById("output");
  
    if (shift < 1 || shift > 25) {
      output.textContent = "Shift value must be between 1 and 25.";
      return;
    }
  
    const decryptedMessage = decryptMessage(message, shift);
    output.textContent = "Decrypted message: " + decryptedMessage;
  }
  
  function encryptMessage(message, shift) {
    let encrypted = "";
    for (let i = 0; i < message.length; i++) {
      let char = message.charAt(i);
      if (/[a-zA-Z]/.test(char)) {
        let code = char.charCodeAt(0);
        let newCode = ((code - 65 + shift) % 26) + 65; // For uppercase letters
        if (char.toLowerCase() === char) {
          newCode = ((code - 97 + shift) % 26) + 97; // For lowercase letters
        }
        encrypted += String.fromCharCode(newCode);
      } else {
        encrypted += char; // Keep non-alphabetic characters unchanged
      }
    }
    return encrypted;
  }
  
  function decryptMessage(message, shift) {
    return encryptMessage(message, -shift); // Decrypting is the same as encrypting with a negative shift
  }
  const lettersEl = document.getElementById("letters");

for (let i = 0; i < 26; i++) {
    const letterEl = document.createElement("li");
    letterEl.textContent = `${i + 1}: ${String.fromCharCode(i + 65)}`;
    lettersEl.appendChild(letterEl);
}