import { useState, useEffect, Fragment, } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Listbox, Transition } from '@headlessui/react'




const icon = L.icon({ iconUrl: "/Auroville_symbol.svg", iconSize: new L.Point(20, 34) });

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]


export default function Map({ land }) {
  
  const [selected, setSelected] = useState(people[0])
  const position = [12.00712, 79.81010]

  const [query, setQuery] = useState('');
  const [village, setVillage] = useState('');
  const searchFilter = (array) => {
      return array.filter(

      (el) => el.village.toLowerCase().includes(village)
    )
  }

  const filtered = searchFilter(land)

  //Handling the input on our search bar
  const handleChange = (e) => {
    setVillage(e.target.value)
  }


  return (

    <div>
      <div class="flex flex-col sm:flex-row">
      <div class="mx-auto px-4 sm:basis-1/4">          
          <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={village} onChange={handleChange}>
            <option value="">Choose a Village</option>
            <option value="thiruchitrambalam">Thiruchitrambalam</option>
            <option value="irumbai">Irumbai</option>
          </select>
        </div>
        <div class="border-double border-4 border-indigo-600 sm:basis-3/4">
          <MapContainer center={position} zoom={13} style={{ height: '80vh' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((item, index) => {
              if (item.lat !== '-') {
                return (
                  <Marker position={[item.lat, item.lg]} icon={icon} key={index} >
                    <Popup>
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                #
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Plot No
                              </th>
                              <td className="px-6 py-4">
                                {item.plotno}
                              </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Village
                              </th>
                              <td className="px-6 py-4">
                                {item.village}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Popup>
                  </Marker>
                );
              }
            })}
          </MapContainer>
        </div>
       

      </div>
    </div>
  );
}

