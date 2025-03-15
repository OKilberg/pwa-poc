import TabView from "@/components/TabView";
import { ShieldUser } from "lucide-react";
import React from "react";

const Admin = () => {
  return (
    <div className="flex flex-col justify-center bg-base-200 rounded-md font-publicSans">
      <div className="card flex-1">
        <div className="card-body">
          <h1 className="card-title">
            <ShieldUser />
            Admin
          </h1>

          <TabView>
            <TabView.Tab id="tab1" defaultTab name="tab1" label="Dashboard">
              <section>
                <div className="flex w-52 flex-col gap-4">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </section>
            </TabView.Tab>
            <TabView.Tab id="tab2" name="tab1" label="Employees">
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabView.Tab>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Admin;
