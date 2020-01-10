import React, { useState } from 'react';
import { H2, StyledMain, StyledTitleWrapper } from '../components/styledComp';
import Subject from '../components/Subject/Subject';
import { nowaConfigSubjects, scale } from '../data/nowaConfig';

import AddSubject from '../components/AddSubject/AddSubject';

const NowaMaturaPage = props => {
  const [nowaConfig, setNowaConfig] = useState(nowaConfigSubjects);
  const [lastResult, setLastResult] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  // Calculate result for Nowa Matura
  const calcResult = () => {
    const results = nowaConfig.map(item => item.input
      .map((subject, index) => {
        const { unique, value, name } = subject;
        const { langs, basic, extended } = scale;

        if (index % 2 === 0) {
          if (unique) {
            return parseFloat((value * basic).toFixed(2));
          }

          if (isChecked && name.includes('Foreign')) {
            return parseFloat((langs * value * extended).toFixed(2));
          }

          return parseFloat((langs * value * basic).toFixed(2));
        }

        if (unique) {
          return parseFloat(value * extended.toFixed(2));
        }

        if (isChecked && name.includes('Foreign')) {
          return parseFloat((langs * value * extended).toFixed(2));
        }

        return parseFloat((langs * value * extended).toFixed(2));
      })
      .reduce((acc, cur) => Math.max(acc, cur)));

    const veryLastResult = results.reduce((acc, cur) => acc + cur, 0);

    setLastResult(parseFloat(veryLastResult.toFixed(2)));
  };

  const handleItemClick = (e, num) => {
    props.handleItemClick(e, num, calcResult, nowaConfig, setNowaConfig);
  };

  const handleInputChange = (e, id) => {
    const { type } = e.target;

    if (type === 'checkbox') setIsChecked(!isChecked);

    props.handleConfigInputChange(e, nowaConfig, setNowaConfig, isChecked, id);
  };

  const handleSubmit = e => {
    e.preventDefault();

    calcResult();
  };

  return (
    <StyledMain>
      <StyledTitleWrapper>
        <H2 square medium black regular>
          Nowa Matura
        </H2>
        <i
          className="material-icons"
          data-type="clear"
          onClick={e => handleItemClick(e)}
        >
          delete_sweep
        </i>
      </StyledTitleWrapper>
      <Subject
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleItemClick={handleItemClick}
        data={nowaConfig}
        lastResult={lastResult}
        isChecked={isChecked}
        checkboxExist
      />
      <AddSubject handleItemClick={handleItemClick} />
    </StyledMain>
  );
};

export default NowaMaturaPage;
