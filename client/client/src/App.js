import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tabs, TabList, TabPanel, Tab } from "react-re-super-tabs";
import CustomTab from "./components/CustomTab/CustomTab.js";

import { getPosts } from "./actions/posts.js";
import DataDisplay from "./components/DataDisplay/DataDisplay.js";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const devsEUI = [
    "2222222222222222",
    "3333333333333333",
  ];

  return (
    <div>
      <Tabs activeTab="about">
        <TabList>
          {devsEUI.map((eui) => (
            <Tab component={CustomTab} label={`${eui}`} id={`${eui}`} />
          ))}
        </TabList>
        <TabList>
          {devsEUI.map((eui) => (
            <TabPanel
              component={() => <DataDisplay DEV_EUI={`${eui}`} />}
              id={`${eui}`}
            />
          ))}
        </TabList>
      </Tabs>
    </div>
  );
};

export default App;

/* <Grid
container
justifyContent="space-between"
alignItems="flex-start"
spacing={1}
>
<Grid item xs={2}>
  <Form />
</Grid>
</Grid> */
