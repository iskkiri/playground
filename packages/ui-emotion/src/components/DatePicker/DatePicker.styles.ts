import { css } from '@emotion/react';

export const reactDatePickerCss = {
  container: css`
    padding: 24px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    border-radius: 16px;
    background: #fff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
  `,

  buttonGroup: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  `,

  datepicker: css`
    :root {
      --dp-day-color: var(--Black, #000);
      --dp-day-outside-color: #ccc;
      --dp-accent-color: #4e86ff;
      --dp-selected-color: #fff;
      --dp-background-color: #dce6fd;
      --dp-disabled-color: #ccc;
      --dp-cell-size: 40px;
      --dp-caption-height: 20px;
      --dp-outline: 2px solid var(--rdp-accent-color);
    }

    // 기본적으로 연/월을 보여주는 캡션을 숨김
    .react-datepicker__aria-live {
      display: none;
    }

    /* ********************** 인풋 컨테이너 **********************  */
    .react-datepicker__input-container {
      .custom-input-container {
        /* --------- */
        /* 커스텀 영역  */
        /* --------- */
        display: flex;
        gap: 8px;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 0 15px;

        input {
          border: none;
          outline: none;
          pointer-events: none;
        }

        /* 키보드 포커스일 때만 outline */
        &:has(input:focus-visible) {
          outline: 2px solid #4e86ff;
          outline-offset: 2px;
          border-radius: 4px;
        }
      }

      /* --------- */
      /* 커스텀 영역  */
      /* --------- */
      display: flex;
      gap: 8px;
      align-items: center;
      cursor: pointer;
      height: 50px;
      border-radius: 8px;
      border: 1px solid #ddd;
      background: #fff;

      input {
        min-width: 0;
        width: 100%;
        cursor: pointer;

        /* ------------ */
        /* 커스텀 영역  */
        /* ------------ */
        color: #333;
        font-size: 15px;
        line-height: normal;

        &::placeholder {
          color: #bbb;
          font-size: 15px;
          line-height: normal;
        }
      }

      svg {
        flex-shrink: 0;
      }

      .react-datepicker__close-icon {
        content: url('/assets/icons/clear.svg');
        display: flex;
        justify-content: center;
        align-items: center;

        /* ------------ */
        /* 커스텀 영역  */
        /* ------------ */
        margin-right: 15px;
      }
    }

    /* ********************** 팝업과 인풋간의 거리 조절 **********************  */
    // .react-datepicker-popper[data-placement^='bottom'] {
    //   margin-top: 4px;
    // }

    /* ********************** 달력 컨테이너 **********************  */
    .react-datepicker {
      position: relative;

      /* ------------ */
      /* 커스텀 영역  */
      /* ------------ */
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #e4e4e7;
      background: #fff;
    }

    /* ********************** 월 컨테이너 **********************  */
    .react-datepicker__month-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .react-datepicker__month {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* ********************** 달력 커스텀 헤더 **********************  */
    .react-datepicker__header {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .custom-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .custom-header-select-wrapper {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        span {
          color: var(--Cool-Gray-CoolGray900, #121619);
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }

        button {
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;

          width: 32px;
          height: 32px;
          border: none;
          background: transparent;

          svg {
            flex-shrink: 0;
          }
        }
      }
    }

    /* ********************** 팝업 컨테이너 위에 달린 삼각형 **********************  */
    // .react-datepicker__triangle {
    //   display: none;
    // }

    /* ********************** 요일 컨테이너 **********************  */
    .react-datepicker__day-names {
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      .react-datepicker__day-name {
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1 / 1;

        width: var(--dp-cell-size);
        height: 20px;

        color: var(--CoolGray-50, #70737c);
        font-size: 12.8px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 156.25% */
      }
    }

    /* ********************** 주(row) **********************  */
    .react-datepicker__week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    /* ********************** 날짜 **********************  */
    .react-datepicker__day {
      .custom-day {
        width: var(--dp-cell-size);
        aspect-ratio: 1 / 1;
        cursor: pointer;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        color: var(--dp-day-color);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
      }
    }

    // 키보드로 포커스가 잡혔을 경우
    .react-datepicker__day:focus-visible {
      &:not(
          .react-datepicker__day--selected,
          .react-datepicker__day--in-range,
          .react-datepicker__day--range-end
        ) {
        .custom-day {
          background-color: var(--dp-accent-color);
          border: var(--dp-outline);
        }
      }
    }

    /* ********************** 지난달 혹은 다음달의 날짜 **********************  */
    .react-datepicker__day--outside-month {
      .custom-day {
        color: var(--dp-day-outside-color);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
      }
    }

    /* ********************** 선택된 날짜 **********************  */
    .react-datepicker__day--selected {
      .custom-day {
        color: var(--dp-selected-color);
        background-color: var(--dp-accent-color);
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; /* 142.857% */
      }
    }

    /* ********************** 선택 불가능한 날짜 **********************  */
    .react-datepicker__day--disabled {
      .custom-day {
        color: var(--dp-disabled-color);
        cursor: not-allowed;
      }
    }

    // class="react-datepicker__day react-datepicker__day--001 react-datepicker__day--in-selecting-range react-datepicker__day--selecting-range-start react-datepicker__day--selecting-range-end"
    // class="react-datepicker__day react-datepicker__day--001 react-datepicker__day--range-start react-datepicker__day--in-range react-datepicker__day--in-selecting-range react-datepicker__day--selecting-range-start"

    /* ********************** Range  **********************  */
    // 시작 날짜 (start)
    .react-datepicker__day--range-start:not(.react-datepicker__day--range-end) {
      background: linear-gradient(to right, transparent 50%, var(--dp-background-color) 50%);
    }
    .react-datepicker__day--range-start:not(.react-datepicker__day--range-end) {
      .custom-day {
        border-radius: 50%;
        background-color: var(--dp-accent-color);
        color: var(--dp-selected-color);
      }
    }
    .react-datepicker__day--in-selecting-range.react-datepicker__day--selecting-range-start {
      .custom-day {
        background-color: var(--dp-accent-color);
        color: var(--dp-selected-color);
      }
    }

    // 중간 영역 (middle)
    .react-datepicker__day--in-range:not(
        .react-datepicker__day--range-start,
        .react-datepicker__day--range-end
      ) {
      .custom-day {
        border-radius: 0;
        background-color: var(--dp-background-color);
        color: var(--dp-day-color);
      }
    }

    // 종료 날짜 (end)
    .react-datepicker__day--range-end:not(.react-datepicker__day--range-start) {
      background: linear-gradient(to left, transparent 50%, var(--dp-background-color) 50%);
    }
    .react-datepicker__day--range-end:not(.react-datepicker__day--range-start) {
      .custom-day {
        border-radius: 50%;
        background-color: var(--dp-accent-color);
        color: var(--dp-selected-color);
      }
    }

    // range를 2개의 datepicker로 이용 시 시작 날짜가 먼저 선택되었을 경우, 이를 표시하기 위함
    .react-datepicker__day--selecting-range-start.react-datepicker__day--in-selecting-range.react-datepicker__day--selecting-range-end {
      .custom-day {
        background-color: var(--dp-accent-color);
        color: var(--dp-selected-color);
      }
    }

    /* ********************** 커스텀 클래스 **********************  */
    // 시작 날짜 (start)
    .custom-range-start {
      background: linear-gradient(to right, transparent 50%, var(--dp-background-color) 50%);

      .custom-day {
        border-radius: 50%;
        background-color: var(--dp-accent-color);
        color: var(--dp-selected-color);
        font-weight: 600;
      }
    }

    // 중간 날짜 (middle)
    .custom-range-middle {
      background-color: var(--dp-background-color);
      color: var(--dp-day-color);
    }

    // 종료 날짜 (end)
    .custom-range-end {
      background: linear-gradient(to left, transparent 50%, var(--dp-background-color) 50%);

      .custom-day {
        border-radius: 50%;
        background-color: var(--dp-accent-color);
        color: var(--dp-selected-color);
        font-weight: 600;
      }
    }

    // 시작 날짜와 종료 날짜가 같은 경우
    .custom-range-start.custom-range-end {
      background: transparent;
    }
  `,
};
