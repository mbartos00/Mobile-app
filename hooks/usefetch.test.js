import { renderHook, act, waitFor } from '@testing-library/react-native';
import useFetch from './useFetch';
import axios from 'axios';
jest.mock('axios', () => ({
  request: jest.fn(),
}));

describe('useFetch', () => {
  it('fetches data from the API', async () => {
    const mockData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    axios.request.mockResolvedValue({ data: { data: mockData } });

    const { result } = renderHook(() => useFetch('users', { q: 'John' }));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('handles errors', async () => {
    const errorMessage = 'Network Error';
    axios.request.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetch('users', { q: 'John' }));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error.message).toBe(errorMessage);
    });
  });

  it('refetches data', async () => {
    const mockData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    axios.request.mockResolvedValue({ data: { data: mockData } });

    const { result } = renderHook(() => useFetch('users', { q: 'John' }));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    axios.request.mockResolvedValue({ data: { data: [mockData[0]] } });

    act(() => {
      result.current.refetch();
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual([mockData[0]]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });
});
