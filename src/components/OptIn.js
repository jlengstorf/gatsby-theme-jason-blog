import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Button from './Button';
import { animation, colors, media } from '../tokens';

const API_URL = 'https://app.convertkit.com/forms/957119/subscriptions';
const API_REDIRECT = 'https://lengstorf.com/confirm';

const Form = styled('form')`
  position: relative;

  &.submitting {
    ::before,
    ::after {
      content: '';
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: calc(50% - 0.5rem);
      left: calc(50% - 1rem);
      background-color: var(${colors.primary});
      border-radius: 50%;
      transform: scale(0.1);
      animation-name: radar;
      animation-duration: 1200ms;
      animation-iteration-count: infinite;
      animation-direction: normal;
    }

    ::after {
      animation-delay: 600ms;
    }
  }

  @supports (display: grid) {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media ${media.medium} {
      grid-template-columns: repeat(2, auto) 140px;
    }
  }
`;

const Label = styled('label')`
  position: relative;
  margin: 0.5rem 0 0;

  @supports (display: grid) {
    grid-column: span 2;

    @media ${media.small} {
      grid-column: span 1;
    }
  }
`;

const LabelText = styled('span')`
  color: ${colors.gray};
  display: block;
  font-size: 0.5rem;
  left: 0.5rem;
  letter-spacing: 0.1em;
  line-height: 1.7;
  margin: 0;
  pointer-events: none;
  position: absolute;
  top: 0.125rem;
  transition: all 300ms ease-out;
`;

const Input = styled('input')`
  background-color: ${colors.lightest};
  border: 0;
  border-bottom: 2px solid ${colors.gray};
  display: block;
  font-size: 1rem;
  margin: 0;
  padding: 1rem 0.5rem 0.5rem;
  transition: all ${animation.transitionTime} linear;
  width: 100%;

  &[value=''] + span {
    color: ${colors.textLight};
    font-size: 1rem;
    letter-spacing: 0;
    top: 0.75rem;
  }

  :focus {
    background-color: ${colors.grayLightest};
    border-color: ${colors.primary};
    outline: none;
  }

  :disabled {
    opacity: 0.25;
  }

  :disabled + span {
    opacity: 0.5;
  }
`;

const FormButton = styled(Button)`
  margin-top: 1rem;
  max-width: 300px;
  padding: 0.25rem 0.5rem 0.125rem;

  :disabled {
    background-color: ${colors.gray};
    opacity: 0.5;
  }

  @supports (display: grid) {
    grid-column: span 2;

    @media ${media.medium} {
      font-size: 1rem;
      grid-column: span 1;
      width: 100%;
    }
  }
`;

const getTagByGroup = (group) => {
  switch (group) {
    case 'PRODUCTIVE':
      return '948586'; // tag: 5-habits-unfuckwithably-productive
    case 'TRAVEL':
      return '948573'; // tag: remote-work-checklist
    case 'WORKHAPPY':
    default:
      return '948585'; // tag: 3-obvious-habits
  }
};

const useForm = ({ source, tag }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setFormValues] = useState({
    first_name: '',
    email_address: '',
  });

  const updateValue = (event) => {
    const { id, value } = event.target;

    setFormValues((state) => ({ ...state, [id]: value }));
  };

  const handleSubmit = (event) => {
    if (typeof window === 'undefined') {
      return;
    }

    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      ...values,
      fields: {
        signup_source: source,
      },
      tags: [tag],
    };

    axios
      .post(API_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        crossDomain: true,
      })
      .then(() => {
        // Redirect to the confirmation page.
        window.location.href = API_REDIRECT;
      });
  };

  return [
    { values, isSubmitting },
    { updateValue, handleSubmit },
  ];
};

const OptIn = ({ source, button = 'Get It Now', group = 'DEFAULT' }) => {
  const tag = getTagByGroup(group);
  const [{ values, isSubmitting }, { updateValue, handleSubmit }] = useForm({
    source,
    tag,
  });

  const Btn = FormButton.withComponent('button');

  return (
    <Form
      className={isSubmitting ? 'submitting' : ''}
      action={API_URL}
      method="post"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="first_name">
        <Input
          id="first_name"
          name="fields[first_name]"
          type="text"
          value={values.first_name}
          onChange={updateValue}
          disabled={isSubmitting}
          required
        />
        <LabelText>First Name</LabelText>
      </Label>
      <Label htmlFor="email_address">
        <Input
          id="email_address"
          name="email_address"
          type="email"
          value={values.email_address}
          onChange={updateValue}
          disabled={isSubmitting}
          required
        />
        <LabelText>Email</LabelText>
      </Label>
      <Btn type="submit" name="subscribe" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : button}
      </Btn>
      <input type="hidden" name="tags[]" value={tag} />
      <input type="hidden" name="fields[signup_source]" value={source} />
    </Form>
  );
};

export default OptIn;
