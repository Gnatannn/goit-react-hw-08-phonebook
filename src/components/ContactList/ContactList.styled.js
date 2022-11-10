import styled from 'styled-components';

export const List = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-width: 100px;
  max-width: 300px;
  height: 100px;
  border: 1px solid green;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  :hover {
    border: 2px solid green;
  }
`;

export const ListItemHeader = styled.h2`
  margin: 0;
  margin-bottom: auto;
`;

export const ListItemText = styled.p`
  margin: 0;
  font-weight: 600;
`;

export const ListItemButton = styled.button`
  width: 70px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 5px;
  margin-top: 5px;
  :hover {
    background-color: red;
    opacity: 0.85;
  }
`;
