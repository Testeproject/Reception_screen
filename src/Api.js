import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Api.css';

const supabaseUrl = 'https://hmbdwmpbncqhisrivszm.supabase.co/rest/v1/fila?select=*';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYmR3bXBibmNxaGlzcml2c3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzMyNTEsImV4cCI6MjAxMTkwOTI1MX0.w5wc5bAwmZQgUSrmyJIjJ9O8HbSIv_FJg1tl4oPZzR8';

const supabase = createClient(supabaseUrl, supabaseKey);

function RealTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}

function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchDataFromTable() {
      try {
        const { data, error } = await supabase
          .from('fila')
          .select('id, paciente, horario_marcado, status')
          .filter('status','eq','2')
          // .limit(6)
          .order('horario_marcado, id', { ascending: true });
          

        if (error) {
          console.error(error);
          return;
        }
        console.log(data);

        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchDataFromTable();

    const interval = setInterval(fetchDataFromTable, 1000);
    return () => clearInterval(interval)
  }, []);



  return (
    <div class="container">
      <div className='left-block'>
        <div class="principal-block">
          {data.length > 0 && (
            <div>
              <h2>{data[0].paciente}</h2>
              <p>Horário Marcado: {data[0].horario_marcado}</p>
              <div class='real-time'><RealTime></RealTime></div>
            </div>
          )}
        </div>
        <div class='bottom-block'>
          {data.slice(4).reverse().map((item, index) => (
            <div key={item.id} class='data-block-bottom'>
              <h2>{item.paciente}</h2>
              <p>{item.horario_marcado}</p>
            </div>
          ))}
        </div>
      </div>
      <div class="right-block">
        {data.slice(1,4).map((item, index) => (
          <div key={item.id} class="data-block-right">
            <h2>{item.paciente}</h2>
            <p>Horário Marcado: {item.horario_marcado}</p>
          </div>
        ))}
      </div>

      
    </div>
  )
}

export default DataTable;
