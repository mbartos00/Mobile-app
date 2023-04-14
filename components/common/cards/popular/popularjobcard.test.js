import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PopularJobCard from './PopularJobCard';

const mockItem = {
  employer_logo: 'https://example.com/logo.png',
  employer_name: 'Example Company',
  job_title: 'Example Job Title',
  job_publisher: 'Example Publisher',
  job_country: 'Example Country',
};

describe('PopularJobCard', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <PopularJobCard item={mockItem} />
    );

    waitFor(() => {
      expect(getByTestId('job-card')).toBeTruthy();
      expect(getByText(mockItem.employer_name)).toBeTruthy();
      expect(getByText(mockItem.job_title)).toBeTruthy();
      expect(getByText(mockItem.job_publisher)).toBeTruthy();
      expect(getByText(mockItem.job_country)).toBeTruthy();
    });
  });

  it('calls handleCardPress function when pressed', () => {
    const handleCardPress = jest.fn();
    const { getByTestId } = render(
      <PopularJobCard
        item={mockItem}
        handleCardPress={handleCardPress}
      />
    );

    fireEvent.press(getByTestId('job-card'));
    expect(handleCardPress).toHaveBeenCalledTimes(1);
    expect(handleCardPress).toHaveBeenCalledWith(mockItem);
  });
});
