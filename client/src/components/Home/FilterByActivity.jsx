import React from "react";

export default function FilterByActivity({
  handleFilterActivity,
  allActivities,
}) {
  return (
    <div className="filter-by-activity">
      <select onChange={handleFilterActivity}>
        <option value="Elegir Actividad">Elegir Actividad</option>
        {allActivities.map((activity) => (
          <option key={activity} value={activity}>
            {activity}
          </option>
        ))}
      </select>
    </div>
  );
}
