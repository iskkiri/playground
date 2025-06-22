import { css, type Interpolation, type SerializedStyles, type Theme } from '@emotion/react';

export const selectCss = {
  control: css`
    /* Nesting을 해야 기본 스타일을 overriding 할 수 있으니 nesting을 제거하지 말 것 */
    // container > 1.control
    // container > 2.menu
    // reactSelectContainerStyle
    .react-select-container {
      // control > 1.value-container
      // control > 2.indicators
      // 컨트롤 컨테이너 (default => min-height:38px, cursor: default 등등)
      .react-select__control {
        cursor: pointer;
        // padding-top, padding-bottom을 주게되면 placeholder를 사용할 때 문제가 발생
        // 따라서 위아래 패딩 값은 절대로 주어서는 안되고, 양옆으로만 가능
        padding: 0 20px;
        background: var(--rs-background);
        min-height: 45px;
        border: 1px solid var(--rs-border);
        border-radius: 6px;

        .react-select__value-container.react-select__value-container--is-multi.react-select__value-container--has-value {
          display: flex;
          gap: 4px;
        }

        // value-container > 1.placeholder
        // value-container > 2.single-value
        .react-select__value-container {
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;

          .react-select__placeholder {
            color: var(--rs-placeholder);
          }

          // 텍스트 스타일 설정
          .react-select__single-value {
            color: var(--rs-active-text);
          }
        }

        // indicators > indicator-separator, dropdown-indicator
        .react-select__indicators {
          // 구분선: 설정할 일 거의 없으므로 diplay:none
          .react-select__indicator-separator {
            display: none;
          }

          // clear 인디케이터 (X표시)
          .react-select__clear-indicator {
            svg {
              path {
                fill: #aaa;
              }
            }
          }
          // 드롭다운 스타일 설정
          // .react-select__dropdown-indicator {
          // }
        }
      }

      .react-select__control--is-focused {
        border: 1px solid var(--rs-active-border);
      }

      // 메뉴가 열렸을 때, 컨테이너(컨트롤) 스타일
      .react-select__control--menu-is-open {
        border: 1px solid var(--rs-active-border);
      }
      // 선택 불가일 때, 컨테이너(컨트롤) 스타일
      .react-select__control--is-disabled {
        pointer-events: auto;
        cursor: not-allowed;
      }
    }
  `,

  menu: css`
    // reactSelectMenuStyle
    // 메뉴 리스트 컨테이너 > 메뉴 리스트 > 메뉴 리스트 아이템
    // 메뉴 리스트 컨테이너(default => position:absolute, top:100%, width:100%)
    .react-select__menu {
      // padding-top / padding-bottom을 이용하여 control과의 간격을 조절
      // padding-bottom은 menuPlacement가 top일 경우를 대응 (menuPlacement를 auto로 설정하였으므로)
      width: 100%;
      padding: 8px 0;

      // 메뉴 리스트(default => position:relative, overflow-y:auto, max-height: 300px)
      .react-select__menu-list {
        padding: 10px;
        border: 1px solid var(--rs-border);
        border-radius: 6px;
        background: var(--rs-background);

        display: flex;
        flex-direction: column;
        gap: 4px;

        max-height: 264px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        &::-webkit-scrollbar-thumb {
          background: var(--rs-scroll-thumb);
          border-radius: 8px;
          background-clip: padding-box;
          border: 2px solid transparent;
        }
      }

      // 메뉴 리스트 아이템
      .react-select__option {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border-radius: 6px;

        color: var(--rs-text);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      // 선택된 리스트 아이템
      .react-select__option--is-focused.react-select__option--is-selected {
        background: var(--rs-active);
        color: var(--rs-active-text);
      }
      // placeholder를 사용하는 경우에는 고려를 해야함
      // placeholder를 사용하고, 디폴트 값이 설정되어 있지 않은 경우에는
      // 첫 번째 아이템이 포커스되어 있는 것이 원치 않는 상황일 수도 있음(이게 디폴트 값 + 설정이 불가능함)
      .react-select__option--is-focused {
        background: var(--rs-active);
        color: var(--rs-active-text);
      }

      // 선택불가로 설정된 리스트 아이템
      .react-select__option--is-disabled {
        cursor: not-allowed;
        color: var(--rs-disabled);
        background: #fff;

        // hacky code
        &:hover {
          background: #fff;
        }
      }
    }
  `,
};

export const selectPortalCss = {
  portalMenu: css`
    .react-select__menu-portal {
      ${selectCss.menu}
    }
  `,

  portal: (cssStyle: Interpolation<Theme>) => css`
    body .react-select__menu-portal {
      ${cssStyle as SerializedStyles}
    }
  `,
};
