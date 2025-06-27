import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';

// 예시 API 함수
const fetchWelcomeData = async () => {
  // 실제 프로젝트에서는 실제 API 호출
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    welcomeMessage: 'React Router + TanStack Query 보일러플레이트에 오신 것을 환영합니다!',
    features: [
      '단순한 라우팅',
      'TanStack Query 데이터 패칭',
      '강력한 캐싱 시스템',
      'Optimistic Updates',
      'Background Refetching',
    ],
  };
};

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['welcome-data'],
    queryFn: fetchWelcomeData,
    staleTime: 5 * 60 * 1000, // 5분간 fresh
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">React Router + TanStack Query</h1>
        <p className="text-xl text-gray-600">{data?.welcomeMessage}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">주요 기능</h2>
          <ul className="space-y-2">
            {data?.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">빠른 시작</h2>
          <div className="space-y-3">
            <Link
              to="/about"
              className="block p-3 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
            >
              → 프로젝트 소개 보기
            </Link>
            <Link
              to="/contact"
              className="block p-3 bg-green-50 hover:bg-green-100 rounded transition-colors"
            >
              → 연락처 확인하기
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-3">TanStack Query 장점</h3>
        <p className="text-gray-600">
          이 보일러플레이트는 React Router의 단순한 라우팅과 TanStack Query의 강력한 데이터 관리를
          결합하여 실용적이고 확장 가능한 React 애플리케이션을 구축할 수 있도록 설계되었습니다.
        </p>
      </div>
    </div>
  );
}
