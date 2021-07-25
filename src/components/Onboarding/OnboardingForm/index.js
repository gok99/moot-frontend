import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes'; 

import OWForm from '../OnboardingWelcomeForm';
import OVForm from '../OnboardingVerificationForm';
import OTForm from '../OnboardingTelegramForm';
import ODForm from '../OnboardingDescriptionForm';
// import OIForm from '../OnboardingIconForm';
// import OIntForm from '../OnboardingInterestsForm';
import OLForm from '../OnboardingLastForm';

import '../../Styles/styles.css';
import '../onboarding.css'

/**
 * Functional Container Component that handles the transition between the Onboarding Forms.
 */
const OnboardingFormBase = (props) => {
  const [formState, setFormState] = useState({
    count: 0,
    progress: 0
  });
  const [profile, setProfile] = useState({
    username: '',
    id: 0
  });
  const history = useHistory();

  useEffect(() => {
    const fb = props.firebase;
    const uid = fb.auth.currentUser.uid;
    const listener = fb.userProfile(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        setProfile({
          username: user.username,
          id: user.id,
        });
      } else {
        console.log("No data available");
      }
    });
    return () => fb.userProfile(uid).off('value', listener);
  }, []);

  // const changeFormState = (event) => {
  //   if (formState.count === 6) {
  //     history.push({ pathname: ROUTES.HOME });
  //   } else {
  //     setFormState({
  //       count: formState.count + 1,
  //       progress: formState.progress + 16
  //     });
  //   }
  // };

  const changeFormState = (event) => {
    if (formState.count === 4) {
      history.push({ pathname: ROUTES.HOME });
    } else {
      setFormState({
        count: formState.count + 1,
        progress: formState.progress + 25
      });
    }
  };

  return (
    <Row className="d-flex justify-content-md-center">
      <Col md="auto" className="b-onboarding">
        {/* {
          formState.count === 0
            ? <OWForm onSubmit={changeFormState} username={profile.username}/>
            : formState.count === 1
              ? <OVForm onSubmit={changeFormState}/>
              : formState.count === 2
                ? <OTForm onSubmit={changeFormState} id={profile.id}/>
                : formState.count === 3
                  ? <ODForm onSubmit={changeFormState}/>
                  : formState.count === 4
                    ? <OIForm onSubmit={changeFormState}/>
                    : formState.count === 5
                      ? <OIntForm onSubmit={changeFormState}/>
                      : formState.count === 6
                        ? <OLForm onSubmit={changeFormState}/>
                        : null
        } */}
        {
          formState.count === 0
            ? <OWForm onSubmit={changeFormState} username={profile.username}/>
            : formState.count === 1
              ? <OVForm onSubmit={changeFormState}/>
              : formState.count === 2
                ? <OTForm onSubmit={changeFormState} id={profile.id}/>
                : formState.count === 3
                  ? <ODForm onSubmit={changeFormState}/>
                  : formState.count === 4
                    ? <OLForm onSubmit={changeFormState}/>
                    : null
        }
      </Col>
      <Col md="auto" className="b-onboarding-alt">
        {/* {
          formState.count === 0
            ? <OWForm onSubmit={changeFormState} username={profile.username}/>
            : formState.count === 1
              ? <OVForm onSubmit={changeFormState}/>
              : formState.count === 2
                ? <OTForm onSubmit={changeFormState} id={profile.id}/>
                : formState.count === 3
                  ? <ODForm onSubmit={changeFormState}/>
                  : formState.count === 4
                    ? <OIForm onSubmit={changeFormState}/>
                    : formState.count === 5
                      ? <OIntForm onSubmit={changeFormState}/>
                      : formState.count === 6
                        ? <OLForm onSubmit={changeFormState}/>
                        : null
        } */}
        {
          formState.count === 0
            ? <OWForm onSubmit={changeFormState} username={profile.username}/>
            : formState.count === 1
              ? <OVForm onSubmit={changeFormState}/>
              : formState.count === 2
                ? <OTForm onSubmit={changeFormState} id={profile.id}/>
                : formState.count === 3
                  ? <ODForm onSubmit={changeFormState}/>
                  : formState.count === 4
                    ? <OLForm onSubmit={changeFormState}/>
                    : null
        }
      </Col>
    </Row>
  );
};

const OnboardingForm = compose(
  withRouter,
  withFirebase,
)(OnboardingFormBase);

export default OnboardingForm;