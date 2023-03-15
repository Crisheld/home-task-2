type permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

type GroupType = { 
  id: number;
  name: string;
  permissions: Array<permission>;
};
  