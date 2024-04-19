import React from 'react';
import { Table as MantineTable } from '@mantine/core';

interface TableProps {
  data: Array<Array<string>>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div >
      <MantineTable  
      style={{ borderCollapse: 'collapse', width: '100%' }}
      >
        <MantineTable.Thead>
          <tr>
            {data[0].map((heading, index) => (
              <th key={index} style={{ 
                border: '1px solid black', 
                padding: '8px', 
                fontWeight: 'bold' }}>
                {heading}
              </th>
            ))}
          </tr>
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    textAlign: cellIndex === 0 ? 'left' : 'center',
                    fontWeight: cellIndex ===0 ? 'bold' : 'normal',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
    </div>
  );
};

export default Table;
