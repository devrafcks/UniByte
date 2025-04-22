let isDark = true;

function toggleTheme() {
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "light" : "dark"
  );
  const icon = document.getElementById("theme-icon");

  if (isDark) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }

  isDark = !isDark;
}

function converter() {
  const input = document.getElementById("textInput").value;
  const asciiOutput = [];
  const binaryOutput = [];
  const extraBases = [];

  input.split("").forEach((char) => {
    const code = char.charCodeAt(0);
    const bin = code.toString(2).padStart(8, "0");
    const hex = code.toString(16).toUpperCase().padStart(2, "0");
    const oct = code.toString(8).padStart(3, "0");

    asciiOutput.push(`${char} → Dec: ${code.toString().padStart(3, " ")}`);
    binaryOutput.push(`${char} → Bin: ${bin}`);
    extraBases.push(`${char} → Hex: 0x${hex} | Oct: 0${oct}`);
  });

  animateText("asciiOutput", asciiOutput.join("\n"));
  animateText("binaryOutput", binaryOutput.join("\n"));
  animateText("extraBasesOutput", extraBases.join("\n"));
}

function copiar() {
  const binText = document.getElementById("binaryOutput").textContent;
  navigator.clipboard.writeText(binText).then(() => {
    const msg = document.getElementById("copiedMsg");
    msg.classList.add("visible");
    setTimeout(() => msg.classList.remove("visible"), 2000);
  });
}

function reverter() {
  const binInput = document.getElementById("binInput").value.trim();
  const binChunks = binInput.includes(" ") ? binInput.split(" ") : [binInput];
  let result = "";

  try {
    binChunks.forEach((bin) => {
      const cleanBin = bin.replace(/[^01]/g, "");
      if (cleanBin.length > 0) {
        const code = parseInt(cleanBin.slice(0, 8).padEnd(8, "0"), 2);
        if (!isNaN(code)) result += String.fromCharCode(code);
      }
    });
  } catch (e) {
    result = "[Erro na conversão]";
  }

  animateText("revertedText", result || "[Nenhum binário válido]");
}

function animateText(id, text) {
  const el = document.getElementById(id);
  el.textContent = "";
  let i = 0;
  const speed = text.length > 100 ? 0 : text.length > 50 ? 2 : 4;

  function addChar() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(addChar, speed);
    }
  }

  addChar();
}
