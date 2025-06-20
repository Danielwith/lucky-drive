import { TaskBoardTypes } from "@/lib/types/types";

export const AppTaskBoard: React.FC<TaskBoardTypes.props> = ({
  cards,
  tasks,
}) => {
  return (
    <div className="py-4 w-full h-full">
      <div className="grid grid-cols-1 md:flex h-full">
        {cards.map(({ status, color }) => {
          const items = tasks.filter(
            (task) => task.statusParent === status
          ).length;
          return (
            <section
              key={status}
              className="rounded-2xl flex flex-col h-full grow gap-5 "
            >
              {/* Header */}
              <header className="mx-3 border-b bg-neutral-700 border-neutral-700 rounded-lg">
                <p className={`h-2 ${color} rounded-t-lg`}></p>
                <div className="flex items-center justify-between px-4 py-2">
                  <h2 className="text-lg font-semibold text-white">{status}</h2>
                  <span
                    className={`text-xs text-white px-1.5 py-1 rounded border-2 border-gray-400`}
                  >
                    {items.toString().padStart(2, "0")}
                  </span>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto px-3 space-y-3">
                {/* Task list */}
                {tasks
                  .filter((task) => task.statusParent === status)
                  .map((task, index) => (
                    <div key={index} className="">
                      {task.renderXml()}
                    </div>
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
