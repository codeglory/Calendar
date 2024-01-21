let date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  const renderedDates = dates.map((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.dataset.date = date;

    const selectedDate = new Date(viewYear, viewMonth, date);
    const dateStr = selectedDate.toISOString().split("T")[0];
    const memo = loadMemo(dateStr);

    dateElement.innerHTML = `
      <span class=${condition}>${date}</span>
      ${memo ? `<div class="memo">${memo}</div>` : ""}
    `;

    return dateElement;
  });
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.dataset.date = date;

    dates[
      i
    ] = `<div class="date" onclick="handleDateClick(this)" data-date="${date}"><span class=${condition}>${date}</span></div>`;
  });

  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
};

// 메모 저장 및 불러오기 함수
function saveMemo(dateStr, memo) {
  localStorage.setItem(dateStr, memo);
}

function loadMemo(dateStr) {
  return localStorage.getItem(dateStr);
}

// Function to handle date click
function handleDateClick(dateElement) {
  const selectedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    dateElement.dataset.date
  );
  const memo = prompt(`메모를 입력하세요. ${selectedDate.toDateString()}:`);

  if (memo !== null) {
    const dateStr = selectedDate.toISOString().split("T")[0];
    saveMemo(dateStr, memo);
    renderCalendar();
  }
}

// ... (your existing code)

renderCalendar();

// ... (your existing code)

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};
