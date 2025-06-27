import React, { useState } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';

// 예시 API 함수들
const fetchProjectInfo = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    name: 'React Router + TanStack Query 보일러플레이트',
    version: '1.0.0',
    description: '실용적인 React 애플리케이션 보일러플레이트',
    author: 'Developer',
    features: [
      {
        name: '단순한 라우팅',
        description: 'React Router의 깔끔한 라우팅 시스템',
      },
      {
        name: 'TanStack Query',
        description: '강력한 데이터 패칭과 캐싱 기능',
      },
      {
        name: '실용성 우선',
        description: '오버엔지니어링 없는 심플한 구조',
      },
      {
        name: '확장성',
        description: '프로젝트 규모에 따라 유연하게 확장 가능',
      },
    ],
  };
};

const submitFeedback = async (feedback: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (feedback.trim().length < 5) {
    throw new Error('피드백은 최소 5글자 이상 입력해주세요.');
  }

  // 실제 프로젝트에서는 API 호출
  console.log('피드백 받음:', feedback);
  return { message: '소중한 피드백 감사합니다!' };
};

export default function AboutPage() {
  const [feedback, setFeedback] = useState('');

  const {
    data: projectInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['project-info'],
    queryFn: fetchProjectInfo,
    staleTime: 10 * 60 * 1000, // 10분간 fresh
  });

  const {
    mutate: sendFeedback,
    isPending,
    isSuccess,
    error: mutationError,
  } = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      setFeedback(''); // 폼 리셋
      // 필요시 다른 쿼리 무효화
      // queryClient.invalidateQueries({ queryKey: ['some-other-data'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendFeedback(feedback);
  };

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
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          ← 홈으로 돌아가기
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">프로젝트 소개</h1>
        <p className="text-lg text-gray-600">{projectInfo?.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 프로젝트 정보 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">프로젝트 정보</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">이름:</span>
              <span className="ml-2 text-gray-600">{projectInfo?.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">버전:</span>
              <span className="ml-2 text-gray-600">{projectInfo?.version}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">개발자:</span>
              <span className="ml-2 text-gray-600">{projectInfo?.author}</span>
            </div>
          </div>
        </div>

        {/* 피드백 폼 - useMutation 예제 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">피드백 보내기</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                의견이나 제안사항을 알려주세요
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="프로젝트에 대한 피드백을 남겨주세요..."
                disabled={isPending}
              />
            </div>

            <button
              type="submit"
              disabled={isPending || !feedback.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending ? '전송 중...' : '피드백 전송'}
            </button>
          </form>

          {/* 결과 표시 */}
          {isSuccess && (
            <div className="mt-4 p-3 rounded-md bg-green-50 text-green-800 border border-green-200">
              피드백이 성공적으로 전송되었습니다!
            </div>
          )}

          {mutationError && (
            <div className="mt-4 p-3 rounded-md bg-red-50 text-red-800 border border-red-200">
              {mutationError.message}
            </div>
          )}
        </div>
      </div>

      {/* 주요 기능 설명 */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">주요 기능</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projectInfo?.features.map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">{feature.name}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TanStack Query 장점 설명 */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🚀 TanStack Query 활용 예제</h3>
        <div className="text-blue-800 text-sm space-y-2">
          <p>
            <strong>useQuery:</strong> 프로젝트 정보를 캐싱과 함께 효율적으로 로딩
          </p>
          <p>
            <strong>useMutation:</strong> 피드백 전송을 상태 관리와 함께 처리
          </p>
          <p>
            <strong>Error & Loading:</strong> 일관된 에러 처리와 로딩 상태 제공
          </p>
        </div>
      </div>
    </div>
  );
}
