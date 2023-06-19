import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import Chore from "../../components/Chore/Chore";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import AddButton from "../../components/UI/Button/AddButton";
import InputChore from "../../components/Chore/InputChore";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
const Header = styled.div`
  grid-column: 1/-1;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  grid-column: 1/-1;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ChoresPage = ({ chores, getChores, loading }) => {
  useEffect(() => {
    getChores();
  }, []);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  let content;
  if (!chores || loading) {
    content = <Fragment>Loading</Fragment>;
  } else if (chores.length === 0) {
    content = <h6 className="center">No chores</h6>;
  } else {
    content = (
      <Fragment>
        {chores.map((chore) => {
          return <Chore key={chore.id} chore={chore} />
        })}
      </Fragment>
    );
  }

  return (
    <JournalMain>
      <Wrapper>
        <Header>
          <h3>Chores</h3>
        </Header>
        {content}
        <ButtonWrapper>
          <AddButton action={() => setIsAdding(true)}>Add Chore</AddButton>
        </ButtonWrapper>
        <InputChore opened={isAdding} close={() => setIsAdding(false)} />
      </Wrapper>
    </JournalMain>
  );
};

const mapStateToProps = ({ house }) => ({
  chores: house.chores,
  loading: house.loading,
});

const mapDispatchToProps = {
  getChores: actions.getChores,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoresPage);
