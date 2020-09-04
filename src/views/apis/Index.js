import React from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, TablePagination, CircularProgress, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux';

export function ApiIndex() {
  const apis = useSelector(state => state.apis.items);
  const loading = useSelector(state => state.apis.loading);

  return (
    <Box>
      <h2> API 목록 </h2>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">API 명</TableCell>
              <TableCell align="center">버전</TableCell>
              <TableCell align="center">호출주소</TableCell>
              <TableCell align="center">Operation 갯수</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">최종 호출 시간</TableCell>
              <TableCell align="center">배포일</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            { loading &&
              <TableLodingProgress colSpan={9}/>
            }
            { apis && Array.isArray(apis) && apis.length <= 0 &&
              <EmptyApis/>
            }
            { apis && Array.isArray(apis) && apis.map(api => {
                return (
                  <TableRow>
                    <TableCell align="center">{api.id}</TableCell>
                    <TableCell align="center">{api.name}</TableCell>
                    <TableCell align="center">{api.version}</TableCell>
                    <TableCell align="center">{api.endPoint}</TableCell>
                    <TableCell align="center">{api.operations.length}</TableCell>
                    <TableCell align="center">{api.state}</TableCell>
                    <TableCell align="center">{api.lastCalledAt}</TableCell>
                    <TableCell align="center">{api.deployedAt}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" color="primary">API 관리</Button>
                      <Button variant="outlined" size="small" color="secondary">버전 관리</Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} alignItems="center" flexWrap="wrap" style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Pagination count={100}  showFirstButton showLastButton variant="outlined" shape="rounded" size="large" page={Number(1)}/>
      </Box>
    </Box>
  )
}

function EmptyApis() {
  return (
    <TableRow>
      <TableCell colSpan={9} align="center">
        등록된 API가 없습니다. 신규 API를 등록해주세요.
      </TableCell>
    </TableRow>
  )
}

function TableLodingProgress(props) {
  const colSpan = props.colSpan || 1;

  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <CircularProgress/>
      </TableCell>
    </TableRow>
  )
}