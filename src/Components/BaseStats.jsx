import { useEffect } from "react";

function BaseStats({ stats }) {
  useEffect(() => {
    const statBars = document.querySelectorAll(".stat-bar");
    statBars.forEach((bar) => {
      bar.style.width = "0%";
    });

    const timeoutId = setTimeout(() => {
      statBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [stats]);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">Base Stats</h1>
      <div className="flex flex-col gap-2 md:gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <p
                className="text-sm md:text-base capitalize"
                style={{
                  textTransform: `${stat.name === "hp" && "uppercase"}`,
                }}
              >
                {stat.name.split("-").join(" ")}
              </p>
              <p className="text-sm md:text-base">{stat.base_stat}</p>
            </div>
            <div className="w-full h-4 rounded-lg bg-slate-300">
              <div
                className={`h-full rounded-lg ${
                  i % 2 === 0 ? "bg-red-500" : "bg-blue-500"
                } stat-bar`}
                style={{
                  width: "0%",
                }}
                data-width={`${(stat.base_stat / 255) * 100}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BaseStats;
