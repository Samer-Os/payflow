export const ColorConfiguration = () => {
  return (
    <>
      <h3 className=" text-black text-xl font-semibold mt-8 dark:text-white">
        Colors
      </h3>
      <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
        <p className="text-base font-medium text-midnight_text dark:text-white dark:text-opacity-50">
          <span className="font-semibold text-lg dark:text-white">
            1. Override Colors
          </span>
          <br />
          For any change in colors : /src/utils/extendedConfig.ts
        </p>
        <div className="py-4 px-5 rounded-md bg-black mt-8">
          <p className="text-sm text-gray-400 flex flex-col gap-2">
            {[
              `primary: "#2F73F2",`,
              `danger: "#DC3545",`,
              `danger_text: "#FF3C78",`,
              `green: "#3CD278",`,
              `grey: "#8E8E8E",`,
              `muted: "#547593",`,
              `midnight_text: "#102D47",`,
              `border: "#DFEBFC",`,
              `darkmode: "#08162B",`,
              `heroBg: "#F3F9FD",`,
              `darkHeroBg: "#121C2E",`,
              `darkheader: "#141D2F",`,
              `dark_border: "#253C50",`,
              `foottext: "#668199",`,
              `search: "#163858",`,
              `dark_b: "#1B2C44",`,
            ].map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
      <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
        <p className="text-base font-medium text-midnight_text dark:text-white dark:text-opacity-50">
          <span className="font-semibold text-lg dark:text-white">
            2. Override Theme Colors
          </span>
          <br />
          For change , go to : /src/utils/extendedConfig.ts
        </p>
        <div className="py-4 px-5 rounded-md bg-black mt-8">
          <p className="text-sm text-gray-400 flex flex-col gap-2">
            {[`primary: "#2F73F2",`, `darkmode: "#08162B",`].map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};
