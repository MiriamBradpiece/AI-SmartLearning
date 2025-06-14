import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrompts } from '../../api';

// הגדרת צבעים:
const blue = "#2196f3";
const pink = "#f8bbd0";
const lightPink = "#fce4ec";

const boxStyle = {
  background: lightPink,
  border: `1px solid ${pink}`,
  borderRadius: 12,
  padding: "16px 18px",
  margin: "18px auto",
  maxWidth: 650,
  fontSize: 16,
  color: blue,
  boxShadow: "0 2px 8px 0 rgba(33,150,243,.07)",
  lineHeight: 1.8
};

const labelStyle = {
  fontWeight: 700,
  color: "#1565c0"
};

const dateStyle = {
  color: "#b71c1c",
  fontWeight: 500
};

const AllPrompts = () => {
  const dispatch = useDispatch();
  const arrPrompts = useSelector((state) => state.history.arrPrompts);
  const loading = useSelector((state) => state.history.loading);
  const error = useSelector((state) => state.history.error);

  const userId = useSelector((state) => state.login.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPrompts(userId));
    }
  }, [dispatch, userId]);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", color: blue }}>All Prompts</h2>
      {arrPrompts && arrPrompts.length > 0 && arrPrompts.map((prompt, idx) => (
        <div style={boxStyle} key={idx}>
          <div>
            <span style={labelStyle}>Prompt:</span> {prompt.prompt1}
          </div>
          <div style={{margin: "10px 0"}}>
            <span style={labelStyle}>Response:</span> {prompt.response ?? ""}
          </div>
          <div>
            <span style={labelStyle}>Created At:</span>{" "}
            <span style={dateStyle}>{prompt.createdAt?.split("T")[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPrompts;