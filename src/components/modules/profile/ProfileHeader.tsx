
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClientSummary } from '@/types/raioXTypes';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface ProfileHeaderProps {
  clientSummary: ClientSummary | undefined;
  clientName: string;
  dataSource?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  clientSummary, 
  clientName,
  dataSource = 'synthetic'
}) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-white">
          {clientSummary?.investor_name || clientName}
        </h2>
        {clientSummary?.clientAge && (
          <p className="text-gray-300 text-sm">
            {clientSummary.clientAge} anos
          </p>
        )}
      </div>
      <TypeSafeDataSourceTag source={dataSource as any} />
    </div>
  );
};

export default ProfileHeader;
