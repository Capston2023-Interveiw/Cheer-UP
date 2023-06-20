INSERT INTO member (account_id, age, email, gender, password, role, username) VALUES ('cheer', 20, 'cheer@a.com', 1, '{bcrypt}$2a$10$JIAjjZly9rUGvjnVItpU4uFneOLFgHH/mRyxnr93KVQC2CoaKFopa', 'ROLE_USER', 'cheer');

INSERT INTO question (content, created_at, status, member_id) VALUES ('1분 자기소개 부탁드립니다.', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('가장 학점이 높은 과목과 낮은 과목에 대해서 말해보세요.', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('전공 선택 계기가 무엇인가요?', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('전공을 어떻게 직무에서 활용할 수 있습니까?', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('기억에 남는 대학생활 경험에 대해 말해보세요. 그로 인해 깨달은 점이 어떤 것이 있나요?', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('본인의 성격을 한 단어로 표현하여 이를 역량과 연관 지어 말해보세요.', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('본인의 약점 때문에 문제가 되었던 적이 있나요?', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('누군가와 갈등을 겪었던 경험이 있나요?', '2023-01-04', '1', '1');
INSERT INTO question (content, created_at, status, member_id) VALUES ('만약 직무가 바뀐다면 어떻게 할 것인가요?', '2023-01-04', '1', '1');

INSERT INTO analysis (type) VALUES ('face');
INSERT INTO analysis (type) VALUES ('posture');
INSERT INTO analysis (type) VALUES ('gaze');
INSERT INTO analysis (type) VALUES ('interjection');
INSERT INTO analysis (type) VALUES ('speed');
INSERT INTO analysis (type) VALUES ('total');

INSERT INTO feedback (content, score, analysis_id) VALUES ('면접 영상에 긍정적인 표정이 많습니다. 긍정적인 표정을 많을 경우, 면접관에게 좋은 인상을 남길 수 있습니다.', '20', '1');
INSERT INTO feedback (content, score, analysis_id) VALUES ('표정 변화가 상대적으로 유동적입니다. 이에 유의해서 긍정적 표정을 유지하며 면접에 응시하기 바랍니다.', '15', '1');
INSERT INTO feedback (content, score, analysis_id) VALUES ('지원자의 표정이 얼마나 의욕적인지로 평가하기도 합니다. 따라서 표정에 유의하여 카메라에 적응해 자연스러운 표정을 연습할 필요가 있습니다.', '10', '1');
INSERT INTO feedback (content, score, analysis_id) VALUES ('면접에 부정적인 표정이 많습니다. 거울을 보고 말하는 연습을 하거나 스마트폰으로 자신이 말하면서 짓는 표정을 촬영해 가면서 준비할 것을 권합니다.', '0', '1');

INSERT INTO feedback (content, score, analysis_id) VALUES ('바른 자세로 인사 담당자에게 호감과 안정감을 줍니다. 지금 자세를 유지해 주세요.', '20', '2');
INSERT INTO feedback (content, score, analysis_id) VALUES ('자세에서 약간의 감점이 있었습니다.  불안정한 자세는 인사 담당자에게 부정적인 인상을 줄 수 있습니다. 고개를 살짝 당기고 가슴을 바르게 펴는 연습을 평소에 하는것이 중요합니다.', '15', '2');
INSERT INTO feedback (content, score, analysis_id) VALUES ('자세에서 감점이 있었습니다. 불안정한 자세는 인사 담당자에게 부정적인 인상을 줄 수 있습니다. 상체의 움직임과 어깨 각도 등을 주의해 주세요. 평소에 바른 자세를 유지하는 연습을 하는것이 중요합니다.', '10', '2');
INSERT INTO feedback (content, score, analysis_id) VALUES ('자세에서 많은 감점이 있었습니다. 불안정한 자세는 인사 담당자에게 부정적인 인상을 줄 수 있습니다. 상체의 움직임, 어깨의 각도, 경직된 움직임 등을 고려하여 바른 자세 연습을 해주세요.', '0', '2');

INSERT INTO feedback (content, score, analysis_id) VALUES ('흔들림 없는 시선 처리로 인사 담당자에게 안정감 있는 인상을 줍니다. 인사 담당자에게 자신감 있는 태도와 면접에 집중하고 있다는 것을 알릴 수 있습니다.', '20', '3');
INSERT INTO feedback (content, score, analysis_id) VALUES ('질문에 대한 답변을 잠깐 생각해보거나 자연스러운 시선 처리를 위해 다른 방향을 보는 정도로 인식됩니다. 오랫동안 시선을 다른 곳에 두지 않도록 주의바랍니다.', '15', '3');
INSERT INTO feedback (content, score, analysis_id) VALUES ('다른 곳을 자주 보며 답변을 하는 경우 자신의 답변에 확신이 없고, 면접에 자신감이 없는 태도로 비춰집니다. 오랫동안 시선을 다른 곳에 두지 않도록 주의바랍니다. 거울을 보며 자신이 말을 할 때 어떤 곳으로 시선을 자주 두는지 연습하여 충분한 준비가 되어있는 태도인지 확인해보는 것을 추천드립니다.', '10', '3');
INSERT INTO feedback (content, score, analysis_id) VALUES ('빈번하게 시선을 다른 곳에 오랫동안 두는 것은 인사 담당자에게 산만한 태도와 자신감이 없는 태도로 인식되는 것으로 이어집니다. 면접에 대해 긴장이 되어 시선을 집중하기 어렵다면 인중이나 코, 미간 등을 바라보며 차분히 대답을 하는 것을 추천드립니다.', '0', '3');

INSERT INTO feedback (content, score, analysis_id) VALUES ('불필요한 추임새 없이 자신의 의견을 정확하고 매끄럽게 전달합니다. 인사 담당자에게 자신감 있고 준비된 지원자로 인식될 수 있습니다.', '20', '4');
INSERT INTO feedback (content, score, analysis_id) VALUES ('조금의 감점이 있지만 자연스러운 말투로 인식됩니다. 머릿속으로 어떤 말을 할 지 구상하며 말한다면 좋은 결과가 예상됩니다.', '15', '4');
INSERT INTO feedback (content, score, analysis_id) VALUES ('추임새가 자주 반복된다면 자신의 답변에 확신이 없어보일 수 있습니다. 미리 질문을 본 후 말을 생각하여 천천히 답변한다면 자신의 의견을 정확하게 전달할 수 있습니다.', '10', '4');
INSERT INTO feedback (content, score, analysis_id) VALUES ('면접에서 불필요한 추임새는 준비되지 않은 지원자로 보일 수 있어 삼가하는 것이 좋습니다. 조금 천천히 답변하더라도 본인의 의견을 정확하고 매끄럽게 전달하는 것이 중요합니다. 불필요한 추임새가 반복된다면 조금 천천히 말하더라도 자신의 의견을 정확하고 매끄럽게 전달하는 것이 좋습니다.', '0', '4');

INSERT INTO feedback (content, score, analysis_id) VALUES ('말 속도가 적당합니다. 말하는 의도가 면접관에게 잘 전달 되어 좋은 인상을 남길 수 있습니다.', '20', '5');
INSERT INTO feedback (content, score, analysis_id) VALUES ('말 속도가 조금 느리거나 빠릅니다. 말하는 의도를 면접관에게 잘 전달하기 위해서는 주어진 시간을 고려해 말의 속도를 조절해야 합니다.', '10', '5');
INSERT INTO feedback (content, score, analysis_id) VALUES ('말 속도 가 너무 느리거나 빠릅니다. 말 속도를 조절하지 못 할 경우 전달력이 떨어져 면접 시 불이익을 얻을 수 있습니다. 모의면접이나 거울을 보고 반복적으로 연습하는 것이 도움이 됩니다.', '0', '5');

INSERT INTO video (url, member_id) VALUES ('http://backend:8080/video/test.mp4', 1);

INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('angry', '0:13', 1, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('sad', '0:39', 1, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('Bad', '0:25', 2, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('Bad', '0:45', 2, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('left', '0:12', 3, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('right', '0:33', 3, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('아', '0:14', 4, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('아', '0:13', 4, 1);
INSERT INTO analysis_log(reason, timestamp, analysis_id, video_id) VALUES  ('매우 느림', '0:00', 5, 1);

INSERT INTO score (score, video_id, feedback_id, analysis_id) VALUES(15, 1, 2, 1);
INSERT INTO score (score, video_id, feedback_id, analysis_id) VALUES(20, 1, 5, 2);
INSERT INTO score (score, video_id, feedback_id, analysis_id) VALUES(0, 1, 12, 3);
INSERT INTO score (score, video_id, feedback_id, analysis_id) VALUES(3, 1, 16, 4);
INSERT INTO score (score, video_id, feedback_id, analysis_id) VALUES(15, 1, 18, 5);
INSERT INTO score (score, video_id, feedback_id, analysis_id) VALUES(53, 1, 1, 6);