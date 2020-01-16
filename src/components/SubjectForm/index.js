import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import {
  Formik,
  Form,
  Field,
  FieldArray,
} from 'formik';
import {
  StyledWrapper,
  StyledItem,
  StyledInput,
  StyledInnerWrapper,
  StyledDeleteButton,
  StyledResultWrapper,
  StyledResultItem,
  StyledLabel,
} from './styles';
import {
  StyledCheckbox, StyledButton, H2, H3,
} from '../styledComp';
import CustomSelect from '../CustomSelect';
import AddSubject from '../AddSubject';


const SubjectForm = ({ subjects, grades, validationSchema }) => {
  const [result, setResult] = useState(0);

  const toggleSubjects = (e, submitForm, id, values) => {
    e.preventDefault();
    const newData = { ...values };

    newData.subjects.map(subject => {
      if (id === subject.id) {
        subject.hidden = !subject.hidden;
        subject.primaryScore = '';
        subject.advanceScore = '';
        subject.bigger = 0;
      }

      return subject;
    });

    submitForm();
  };

  return (
    <Formik
      initialValues={subjects}
      validationSchema={validationSchema}
      onSubmit={data => {
        data.subjects.map(subject => {
          const {
            primaryScore, advanceScore, primaryScale, advanceScale, forLanguage,
          } = subject;
          let pscore;
          let ascore;

          if (grades) {
            const { basicGrades, extGrades } = grades;
            pscore = basicGrades.get(primaryScore) * primaryScale * forLanguage;
            ascore = extGrades.get(advanceScore) * advanceScale * forLanguage;
          } else {
            pscore = primaryScore * primaryScale * forLanguage;
            ascore = advanceScore * advanceScale * forLanguage;
          }

          // console.log(pscore, ascore);
          // console.log(parseFloat(pscore.toFixed(2)), parseFloat(ascore.toFixed(2)));

          const res = Math.max(parseFloat(pscore.toFixed(2)), parseFloat(ascore.toFixed(2)));

          // subject.bigger = Math.max(parseFloat(pscore.toFixed(2)), parseFloat(ascore.toFixed(2)));
          subject.bigger = res;
          // return { ...subject, bigger: result };
          return subject;
        });

        // Very last result
        const res = data.subjects.reduce((acc, cur) => acc + cur.bigger, 0);
        setResult(parseFloat(res).toFixed(2));
      }}
    >
      {({ values, submitForm }) => (
        <Form>
          <StyledWrapper>
            <FieldArray name="subjects">
              {() => (
                <PoseGroup>
                  {values.subjects.map((subject, index) => (subject.hidden ? null : (
                    <StyledItem key={subject.id} title={subject.title}>
                      {index === 3 ? <CustomSelect /> : (
                        <div style={{ height: '46px' }}>
                          <H2 left black>{subject.title}</H2>
                        </div>
                      )}

                      <StyledInnerWrapper>
                        <H3>{values.basLevel}</H3>
                        <H3>{values.extLevel}</H3>

                        <Field
                          name={`subjects.${index}.primaryScore`}
                          type="number"
                          as={StyledInput}
                        />

                        <Field
                          name={`subjects.${index}.advanceScore`}
                          type="number"
                          as={StyledInput}
                        />
                      </StyledInnerWrapper>
                      {index === 2 || index === 3 ? (
                        <StyledDeleteButton type="button" onClick={e => toggleSubjects(e, submitForm, values.subjects[index].id, values)}>
                          <i className="material-icons">
                            delete_forever
                          </i>
                        </StyledDeleteButton>
                      ) : null}
                    </StyledItem>
                  )))}
                </PoseGroup>
              )}
            </FieldArray>
          </StyledWrapper>
          <StyledResultWrapper>
            <StyledResultItem>
              <H2 square regular xl black>Wynik: {result > 0 ? result : ''}</H2>
            </StyledResultItem>
            <StyledResultItem>
              <Field type="checkbox" as={StyledCheckbox} />
              <StyledLabel>
                Matura Dwujęzyczna
              </StyledLabel>
            </StyledResultItem>
            <StyledResultItem>
              <StyledButton type="submit">Policz</StyledButton>
            </StyledResultItem>
          </StyledResultWrapper>
          <pre style={{ fontSize: '1.6rem' }}>
            {JSON.stringify(values, null, 2)}
          </pre>
          <AddSubject onClick={toggleSubjects} values={values} submitForm={submitForm} />
        </Form>
      )}
    </Formik>
  );
};

SubjectForm.defaultProps = {
  grades: null,
};

SubjectForm.propTypes = {
  validationSchema: PropTypes.oneOfType([PropTypes.object]).isRequired,
  subjects: PropTypes.oneOfType([PropTypes.object]).isRequired,
  grades: PropTypes.oneOfType([PropTypes.object]),
};

export default SubjectForm;