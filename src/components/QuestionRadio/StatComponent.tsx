import React, { FC, useMemo } from "react";

import { STAT_COLORS } from "../../const";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { QuestionRadioStatPropsType } from "./interface";

function format(n: number) {
    return (n* 100).toFixed(2);
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
//   count求和
    const sum = useMemo(() => {
        let s = 0;
        stat.forEach(i => (s += i.count));
        return s;
    }, [stat]);

    return (
    <div style={{ width: 300, height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"  // x轴的偏移量
            cy="50%"
            outerRadius={50}  // 饼图的直径
            fill="#8884d8"
            label={(i) => `${i.name}: ${format(i.count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
