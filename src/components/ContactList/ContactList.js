// import { PropTypes } from 'prop-types';
import {
  List,
  ListItem,
  ListItemHeader,
  ListItemText,
  ListItemButton,
} from 'components/ContactList/ContactList.styled.js';

export const ContactList = ({ findContacts, deleteContact }) => {
  return (
    <List>
      {findContacts.map(({ name, number, id }) => {
        return (
          <ListItem key={id}>
            <ListItemHeader>{name}</ListItemHeader>
            <ListItemText>{number}</ListItemText>
            <ListItemButton type="button" onClick={() => deleteContact(id)}>
              Delete
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

// ContactList.propTypes = {
//   findContacts: PropTypes.arrayOf(
//     PropTypes.exact({
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     })
//   ),
//   deleteContact: PropTypes.func.isRequired,
// };
