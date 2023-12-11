import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import AddTask from "./Component/AddTask";
import Task from "./Component/Task";
import s from "./home.module.css";

function Home() {
  const [add, setAdd] = useState(false);
  const [allCheck, setAllCheck] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [task, setTask] = useState([]);
  const [oldTask, setOldTask] = useState([]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("task"))) {
      const sort = JSON.parse(localStorage.getItem("task")).sort(function (
        a,
        b
      ) {
        return new Date(a.duedate).getTime() - new Date(b.duedate).getTime();
      });
      setTask(sort);
      setOldTask(sort);
    }
    return () => setTask([]);
  }, [allCheck]);
  const close = () => {
    setAdd(false);
  };
  const checked = (e, v) => {
    let arr = allCheck;
    if (v) {
      arr.push(e);
      setAllCheck(arr);
    } else {
      const find = arr.filter((va) => {
        return va.title !== e.title;
      });
      arr = find;
      setAllCheck(find);
    }
    if (arr?.length > 0) {
      setShowAdd(true);
    } else {
      setShowAdd(false);
    }
  };
  const remove = (e, v) => {
    if (v) {
      const taskNew = task;
      for (let i = 0; i < allCheck.length; i++) {
        const find = taskNew.filter((v) => {
          return v.title === allCheck[i].title;
        });
        if (find.length > 0) {
          taskNew.splice(allCheck[i], 1);
        }
      }
      localStorage.setItem("task", JSON.stringify(taskNew));
      setAllCheck([]);
      setShowAdd(false);
    } else {
      const newTask = task;
      newTask.splice(e, 1);
      setAllCheck([]);
      setShowAdd(false);
      localStorage.setItem("task", JSON.stringify(newTask));
    }
  };
  const search = (e) => {
    let findArr = oldTask.filter((element) => element.title.match(e));
    const sort = findArr.sort(function (a, b) {
      return new Date(a.duedate).getTime() - new Date(b.duedate).getTime();
    });
    setTask(sort);
  };
  return (
    <div className={s.body}>
      {add ? (
        <>
          <Navbar text={"New Task"} />
          <AddTask
            check={(e, v) => {
              checked(e, v);
            }}
            close={() => close()}
          />
        </>
      ) : (
        <>
          <Navbar text={"To Do List 1"} />
          <div className={s.search}>
            <input
              onChange={(e) => search(e.target.value)}
              className={s.searchi}
              type="text"
              placeholder="Search ..."
            />
          </div>
          {task?.length > 0 ? (
            task.map((v, i) => (
              <Task
                allCheck={allCheck}
                key={i}
                check={(e, v) => {
                  checked(e, v);
                }}
                value={v}
                isKey={i}
                remove={(e, v) => remove(e, v)}
              />
            ))
          ) : (
            <div className={s.center}>No Task</div>
          )}
          <Footer
            remove={(e, v) => {
              remove(e, v);
            }}
            key={showAdd}
            isAdd={showAdd}
            add={() => setAdd(true)}
            noCheck={() => {
              setAllCheck([]);
              setShowAdd(false);
            }}
          />
        </>
      )}
    </div>
  );
}

export default Home;
