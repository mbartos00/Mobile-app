import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import NearbyJobCard from './NearbyJobCard';

describe('NearbyJobCard', () => {
  const job = {
    job_title: 'Software Engineer',
    job_employment_type: 'Full Time',
    employer_logo: 'https://example.com/logo.png',
  };

  it('renders job details correctly', () => {
    const { getByTestId } = render(
      <NearbyJobCard
        job={job}
        handleNavigate={() => {}}
      />
    );
    waitFor(() => {
      expect(getByTestId('job-name').textContent).toBe(job.job_title);
      expect(getByTestId('job-type').textContent).toBe(job.job_employment_type);
      expect(getByTestId('logo-image')).toHaveProp('source', {
        uri: job.employer_logo,
      });
    });
  });

  it('calls handleNavigate when pressed', () => {
    const handleNavigate = jest.fn();
    const { getByTestId } = render(
      <NearbyJobCard
        job={job}
        handleNavigate={handleNavigate}
      />
    );

    fireEvent.press(getByTestId('job-card'));
    expect(handleNavigate).toHaveBeenCalled();
  });
});
