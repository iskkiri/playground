import type { Meta, StoryObj } from '@storybook/nextjs';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import FeatherIcons from '@repo/icons/featherIcons';
import { mockHosueList } from './data/mock.data';
import HouseInfoCard from './components/HouseInfoCard';
import useGoogleMapDefaultCenter from './hooks/useGoogleMapDefaultCenter';
import useMarkerClusterer from './hooks/useMarkerCluster';
import useMarkerSelection from './hooks/useMarkerSelection';
import HouseMarker from './components/HouseMarker';
import { appEnv } from '@/_schemas/env.schema';

const meta = {
  title: 'examples/GoogleMap',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <APIProvider apiKey={appEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Story />
      </APIProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Map
        //
        mapId="dc870e1490f255e0"
        defaultCenter={{ lat: 37.5642135, lng: 127.0016985 }}
        defaultZoom={12}
        disableDefaultUI
        gestureHandling={'greedy'}
        style={{ width: '600px', height: '600px' }}
      />
    );
  },
};

export const CustomMarker: Story = {
  render: function Render() {
    return (
      <Map
        //
        mapId="dc870e1490f255e0"
        defaultCenter={{ lat: 37.5642135, lng: 127.0016985 }}
        defaultZoom={12}
        disableDefaultUI
        gestureHandling={'greedy'}
        style={{ width: '600px', height: '600px' }}
      >
        <AdvancedMarker position={{ lat: 37.5642135, lng: 127.0016985 }}>
          <FeatherIcons.MapPin fill="red" color="white" size={36} />
        </AdvancedMarker>
      </Map>
    );
  },
};

export const InfoWindow: Story = {
  render: function Render() {
    const map = useMap();
    // 숙소 목록의 마지막 숙소의 위도/경도를 기준으로 지도 중심 설정
    // 숙소 목록이 초기화되거나 변경되었을 때 지도 중심 설정
    const { defaultCenter } = useGoogleMapDefaultCenter({
      map,
      lat: mockHosueList.length > 0 ? +mockHosueList[mockHosueList.length - 1].latitude : 0,
      lng: mockHosueList.length > 0 ? +mockHosueList[mockHosueList.length - 1].longitude : 0,
    });
    // 선택된 숙소 ID
    const { selectedLodgingId, onClickMarker } = useMarkerSelection({ map });

    return (
      <Map
        //
        mapId="dc870e1490f255e0"
        defaultCenter={defaultCenter}
        defaultZoom={12}
        disableDefaultUI
        gestureHandling={'greedy'}
        style={{ width: '600px', height: '600px' }}
      >
        {/* 숙소 마커 */}
        {mockHosueList.map((houseMarkerInfo) => {
          const position = {
            lat: +houseMarkerInfo.latitude,
            lng: +houseMarkerInfo.longitude,
          };
          const isSelected = selectedLodgingId === houseMarkerInfo.housingId;

          return (
            <AdvancedMarker
              //
              key={houseMarkerInfo.housingId}
              onClick={onClickMarker({
                id: houseMarkerInfo.housingId,
                position,
              })}
              zIndex={isSelected ? 10 : 1}
              position={position}
            >
              <FeatherIcons.MapPin fill="red" color="white" size={36} />
              {isSelected && (
                <HouseInfoCard
                  //
                  thumbnail={houseMarkerInfo.thumbnail}
                  lodgingName={houseMarkerInfo.housingName}
                  country={houseMarkerInfo.country}
                  city={houseMarkerInfo.locality}
                />
              )}
            </AdvancedMarker>
          );
        })}
      </Map>
    );
  },
};

export const Cluster: Story = {
  render: function Render() {
    const map = useMap();
    // 숙소 목록의 마지막 숙소의 위도/경도를 기준으로 지도 중심 설정
    // 숙소 목록이 초기화되거나 변경되었을 때 지도 중심 설정
    const { defaultCenter } = useGoogleMapDefaultCenter({
      map,
      lat: mockHosueList.length > 0 ? +mockHosueList[mockHosueList.length - 1].latitude : 0,
      lng: mockHosueList.length > 0 ? +mockHosueList[mockHosueList.length - 1].longitude : 0,
    });
    // 숙소 마커 클러스터 생성
    const setHouseMarkerRef = useMarkerClusterer({
      map,
      clusterStyle: 'radial-gradient(circle, red, rgba(195, 13, 36, 0))',
    });

    return (
      <Map
        //
        mapId="dc870e1490f255e0"
        defaultCenter={defaultCenter}
        defaultZoom={12}
        disableDefaultUI
        gestureHandling={'greedy'}
        style={{ width: '600px', height: '600px' }}
      >
        {/* 숙소 마커 */}
        {mockHosueList.map((houseMarkerInfo) => (
          <HouseMarker
            //
            key={houseMarkerInfo.housingId}
            housingId={houseMarkerInfo.housingId}
            latitude={+houseMarkerInfo.latitude}
            longitude={+houseMarkerInfo.longitude}
            setHouseMarkerRef={setHouseMarkerRef}
          />
        ))}
      </Map>
    );
  },
};
